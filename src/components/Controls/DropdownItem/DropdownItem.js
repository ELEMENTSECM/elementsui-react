import * as React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { omit } from "../../utils";
import Dropdown from "../Dropdown";

class DropdownItem extends React.Component {
	onItemClick = e => {
		if (this.props.disabled || this.props.header || this.props.divider) {
			e.preventDefault();
			return;
		}

		if (this.props.onClick) {
			this.props.onClick(e);
		}

		if (this.props.tag !== "select" && this.props.toggle) {
			this.context.toggle(e);
		}
	};

	get role() {
		return this.props.header || this.props.divider ? "presentation" : "menuitem";
	}

	render() {
		let { className, divider, tag: Tag, header, active, ...props } = omit(this.props, [ "toggle" ]);

		const classes = classNames(className, {
			disabled: props.disabled,
			"dropdown-item": !divider && !header,
			active: active,
			"dropdown-header": header,
			"dropdown-divider": divider
		});

		if (Tag === "button") {
			if (header) {
				Tag = "h6";
			} else if (divider) {
				Tag = "div";
			} else if (props.href) {
				Tag = "a";
			}
		}

		return (
			<li role="presentation">
				{this.props.children && this.props.children.type === Dropdown ? (
					this.props.children
				) : (
					<Tag
						type={Tag === "button" && (this.props.onClick || this.props.toggle) ? "button" : undefined}
						{...props}
						role={this.role}
						className={classes}
						onClick={this.onItemClick}
					/>
				)}
			</li>
		);
	}
}

DropdownItem.propTypes = {
	/** Component children */
	children: PropTypes.node,
	/** Is item active */
	active: PropTypes.bool,
	/** Is item disabled */
	disabled: PropTypes.bool,
	/** Is item a divider */
	divider: PropTypes.bool,
	/** HTML element tag */
	tag: PropTypes.oneOfType([ PropTypes.func, PropTypes.string ]),
	/** Is item a header */
	header: PropTypes.bool,
	/** onClickevent handler */
	onClick: PropTypes.func,
	/** Class name */
	className: PropTypes.string,
	/** Should toggle menu */
	toggle: PropTypes.bool
};
DropdownItem.defaultProps = {
	tag: "button",
	toggle: true
};
DropdownItem.contextTypes = {
	toggle: PropTypes.func
};

export default DropdownItem;
