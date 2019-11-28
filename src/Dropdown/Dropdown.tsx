import * as React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { Manager } from "react-popper";
import classNames from "classnames";
import { keyCodes } from "../utils";
import { omit } from "lodash";
import DropdownToggle from "./DropdownToggle";
import DropdownMenu from "./DropdownMenu";
import DropdownItem from "./DropdownItem";
import { DropdownContainer } from "./Dropdown.styles";

export interface DropdownProps {
	/** Is dropdown disabled */
	disabled?: boolean;
	/** Open direction */
	direction?: "up" | "down" | "left" | "right";
	/** Is button group */
	group?: boolean;
	/** Is dropdown open */
	isOpen?: boolean;
	/** Is part of navigation menu */
	nav?: boolean;
	/** Is dropdown active */
	active?: boolean;
	/** Addon type */
	addonType?: "prepend" | "append" | boolean;
	/** Size */
	size?: string;
	/** HTML element tag */
	tag?: string;
	/** Toggle function */
	toggle: (e?: any) => void;
	/** Class name */
	className?: string;
	/** Is in nav bar */
	inNavbar?: boolean;
	/** Dropdoen is active if one of it's children is active */
	setActiveFromChild?: boolean;
	/**
	 * Parent toggle
	 */
	parentToggle?: (e?: any) => void;
}

export default class Dropdown extends React.Component<DropdownProps> {
	static Toggle = DropdownToggle;
	static Menu = DropdownMenu;
	static Item = DropdownItem;

	static defaultProps = {
		isOpen: false,
		direction: "down",
		nav: false,
		active: false,
		addonType: false,
		inNavbar: false,
		setActiveFromChild: false
	};

	static childContextTypes = {
		toggle: PropTypes.func.isRequired,
		isOpen: PropTypes.bool.isRequired,
		direction: PropTypes.oneOf(["up", "down", "left", "right"]).isRequired,
		inNavbar: PropTypes.bool.isRequired
	};

	getChildContext() {
		const toggle = e => {
			const isDropdownToggle = e.target.classList.contains("dropdown-toggle");
			if (this.props.parentToggle && this.props.isOpen && !isDropdownToggle) {
				this.props.parentToggle(e);
			}
			this.props.toggle(e);
		};
		return {
			toggle: toggle,
			isOpen: this.props.isOpen,
			direction: this.props.direction,
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
		return ReactDOM.findDOMNode(this) as Element;
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
			container &&
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
			if (container) {
				const expanded = container.querySelector("[aria-expanded]") as HTMLElement;
				expanded && expanded.focus();
			}
			return;
		}

		const menuClass = "dropdown-menu";
		const itemClass = "dropdown-item";
		const disabledClass = "disabled";

		const items = Array.from(
			container.querySelectorAll(`.${menuClass} .${itemClass}:not(.${disabledClass})`)
		).filter((v: any) => v && v.offsetParent) as HTMLElement[];

		if (!items.length) return;

		let index = -1;

		const charPressed = String.fromCharCode(e.which).toLowerCase();

		for (let i = 0; i < items.length; i += 1) {
			const firstLetter = items[i].textContent && items[i].textContent![0].toLowerCase();
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
			isOpen,
			group,
			size,
			nav,
			setActiveFromChild,
			active,
			addonType,
			direction,
			...attrs
		} = omit(this.props, ["toggle", "parentToggle", "disabled", "inNavbar"]);

		attrs.tag = attrs.tag || (nav ? "li" : "div");

		let subItemIsActive = false;
		if (setActiveFromChild) {
			React.Children.map((this.props.children as any[])[1].props.children, dropdownItem => {
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
				<DropdownContainer
					{...attrs}
					className={classes}
					onKeyDown={this.handleKeyDown}
					role={this.props.inNavbar ? "presentation" : "menu"}
				/>
			</Manager>
		);
	}
}
