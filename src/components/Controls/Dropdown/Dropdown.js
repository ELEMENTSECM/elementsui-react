import * as React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { Manager } from "react-popper";
import classNames from "classnames";
import { omit, keyCodes } from "../../utils";

class Dropdown extends React.Component {
	getChildContext() {
		return {
			toggle: this.props.toggle,
			isOpen: this.props.isOpen,
			direction: this.props.direction === "down" && this.props.dropup ? "up" : this.props.direction,
			inNavbar: this.props.inNavbar
		};
	}

	componentDidMount() {
		this.handleProps();
	}

	componentDidUpdate(prevProps) {
		if (this.props.isOpen !== prevProps.isOpen) {
			this.handleProps();
		}
	}

	componentWillUnmount() {
		this.removeEvents();
	}

	getContainer = () => {
		return ReactDOM.findDOMNode(this);
	};

	addEvents = () => {
		["click", "touchstart", "keyup"].forEach(event =>
			document.addEventListener(event, this.handleDocumentClick, true)
		);
	};

	removeEvents = () => {
		["click", "touchstart", "keyup"].forEach(event =>
			document.removeEventListener(event, this.handleDocumentClick, true)
		);
	};

	handleDocumentClick = e => {
		if (e && (e.which === 3 || (e.type === "keyup" && e.which !== keyCodes.tab))) return;
		const container = this.getContainer();

		if (
			container.contains(e.target) &&
			container !== e.target &&
			(e.type !== "keyup" || e.which === keyCodes.tab)
		) {
			return;
		}

		this.toggle(e);
	};

	handleKeyDown = e => {
		if (
			keyCodes.tab === e.which ||
			(/button/i.test(e.target.tagName) && [keyCodes.space, keyCodes.enter].includes(e.which)) ||
			/input|textarea|select/i.test(e.target.tagName)
		) {
			return;
		}

		e.preventDefault();

		if (this.props.disabled) return;

		const container = this.getContainer();
		const isDropdown = e.target.classList.contains("dropdown-toggle");

		if (
			(e.which === keyCodes.space || e.which === keyCodes.enter) &&
			this.props.isOpen &&
			container !== e.target
		) {
			e.target.click();
		}

		if (
			e.which === keyCodes.esc ||
			(!this.props.isOpen && ![keyCodes.down, keyCodes.up].includes(e.which))
		) {
			this.toggle(e);
			container.querySelector("[aria-expanded]").focus();
			return;
		}

		const menuClass = "dropdown-menu";
		const itemClass = "dropdown-item";
		const disabledClass = "disabled";

		let items = container.querySelectorAll(`.${menuClass} .${itemClass}:not(.${disabledClass})`);
		items = Array.from(items).filter(v => v && v.offsetParent); // removes hidden elements..

		if (!items.length) return;

		let index = -1;

		const charPressed = String.fromCharCode(e.which).toLowerCase();

		for (let i = 0; i < items.length; i += 1) {
			const firstLetter = items[i].textContent && items[i].textContent[0].toLowerCase();
			if (firstLetter === charPressed || items[i] === e.target) {
				index = i;
				break;
			}
		}

		if (e.which === keyCodes.up && index > 0) {
			index -= 1;
		}

		if (e.which === keyCodes.down && index < items.length - 1) {
			index += 1;
		}

		if (index < 0) {
			index = 0;
		}

		items[index].focus();
	};

	handleProps = () => {
		if (this.props.isOpen) {
			this.addEvents();
		} else {
			this.removeEvents();
		}
	};

	toggle = e => {
		if (this.props.disabled) {
			return e && e.preventDefault();
		}

		return this.props.toggle(e);
	};

	render() {
		const {
			className,
			dropup,
			isOpen,
			group,
			size,
			nav,
			setActiveFromChild,
			active,
			addonType,
			...attrs
		} = omit(this.props, ["toggle", "disabled", "inNavbar", "direction"]);

		const direction = this.props.direction === "down" && dropup ? "up" : this.props.direction;

		attrs.tag = attrs.tag || (nav ? "li" : "div");

		let subItemIsActive = false;
		if (setActiveFromChild) {
			React.Children.map(this.props.children[1].props.children, dropdownItem => {
				if (dropdownItem && dropdownItem.props.active) subItemIsActive = true;
			});
		}

		const classes = classNames(
			className,
			"react-dropdown",
			direction !== "down" && `drop${direction}`,
			nav && active ? "active" : false,
			setActiveFromChild && subItemIsActive ? "active" : false,
			{
				[`input-group-${addonType}`]: addonType,
				"btn-group": group,
				[`btn-group-${size}`]: !!size,
				dropdown: !group && !addonType,
				show: isOpen,
				"nav-item": nav
			}
		);

		return (
			<Manager>
				<div {...attrs} className={classes} onKeyDown={this.handleKeyDown} role="menu" />
			</Manager>
		);
	}
}

Dropdown.propTypes = {
	/** Is dropdown disabled */
	disabled: PropTypes.bool,
	/** Open direction */
	direction: PropTypes.oneOf(["up", "down", "left", "right"]),
	/** Is button group */
	group: PropTypes.bool,
	/** Is dropdown open */
	isOpen: PropTypes.bool,
	/** Is part of navigation menu */
	nav: PropTypes.bool,
	/** Is dropdown active */
	active: PropTypes.bool,
	/** Addon type */
	addonType: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(["prepend", "append"])]),
	/** Size */
	size: PropTypes.string,
	/** HTML element tag */
	tag: PropTypes.string,
	/** Toggle function */
	toggle: PropTypes.func,
	/** Component children */
	children: PropTypes.node,
	/** Class name */
	className: PropTypes.string,
	/** Is in nav bar */
	inNavbar: PropTypes.bool,
	/** Dropdoen is active if one of it's children is active */
	setActiveFromChild: PropTypes.bool
};
Dropdown.defaultProps = {
	isOpen: false,
	direction: "down",
	nav: false,
	active: false,
	addonType: false,
	inNavbar: false,
	setActiveFromChild: false
};
Dropdown.childContextTypes = {
	toggle: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired,
	direction: PropTypes.oneOf(["up", "down", "left", "right"]).isRequired,
	inNavbar: PropTypes.bool.isRequired
};

export default Dropdown;
