import * as React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Reference } from "react-popper";

class DropdownToggle extends React.Component {
	onClick = e => {
		const { disabled, nav, tag, onClick } = this.props;
		if (disabled) {
			e.preventDefault();
			return;
		}

		if (nav && !tag) {
			e.preventDefault();
		}

		onClick && onClick(e);

		this.context.toggle(e);
	};

	render() {
		const { className, color, caret, split, nav, tag, menuItem, ...props } = this.props;
		const ariaLabel = props["aria-label"] || "Toggle Dropdown";
		let classes = classNames(className, {
			"dropdown-item": menuItem,
			"dropdown-toggle": caret || split,
			"dropdown-toggle-split": split,
			"nav-link": nav,
		});
		const children = props.children || <span className="sr-only">{ariaLabel}</span>;

		let Tag;

		if (nav && !tag) {
			Tag = "a";
			props.href = "#";
		} else if (!tag) {
			Tag = "button";
			classes = classNames(classes, "btn btn-default");
			props.color = color;
		} else {
			Tag = tag;
		}

		if (this.context.inNavbar) {
			return (
				<Tag
					{...props}
					className={classes}
					onClick={this.onClick}
					aria-expanded={this.context.isOpen}
					children={children}
					role={menuItem ? "menuitem" : ""}
				/>
			);
		}

		return (
			<Reference>
				{({ ref }) => (
					<Tag className={classes}
						 type={Tag === "button" ? "button" : undefined}
						 onClick={this.onClick}
						 aria-expanded={this.context.isOpen}
						 ref={ref}
						 role={menuItem ? "menuitem" : ""}
					>
						{children}
					</Tag>
				)}
			</Reference>
		);
	}
}

DropdownToggle.propTypes = {
	/** Show caret */
	caret: PropTypes.bool,
	/** Toggle color */
	color: PropTypes.string,
	/** Component children */
	children: PropTypes.node,
	/** Class name */
	className: PropTypes.string,
	/** Toggle is disabled */
	disabled: PropTypes.bool,
	/** onClickevent handler */
	onClick: PropTypes.func,
	"aria-haspopup": PropTypes.bool,
	split: PropTypes.bool,
	/** Element HTML tag */
	tag: PropTypes.oneOfType([ PropTypes.func, PropTypes.string ]),
	/** Is part of navigation menu */
	nav: PropTypes.bool,
	/** Is menuitem */
	menuItem: PropTypes.bool
};
DropdownToggle.defaultProps = {
	"aria-haspopup": true,
	color: "secondary",
};
DropdownToggle.contextTypes = {
	isOpen: PropTypes.bool.isRequired,
	toggle: PropTypes.func.isRequired,
	inNavbar: PropTypes.bool.isRequired
};

export default DropdownToggle;
