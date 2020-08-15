import * as React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { omit } from "lodash";
import Dropdown from "./Dropdown";

export interface DropdownItemProps {
	/** Is item active */
	active?: boolean;
	/** Is item disabled */
	disabled?: boolean;
	/** Is item a divider */
	divider?: boolean;
	/** HTML element tag */
	tag?: React.ComponentType | keyof JSX.IntrinsicElements;
	/** Is item a header */
	header?: boolean;
	/** onClickevent handler */
	onClick?: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	/** Class name */
	className?: string;
	/** Should toggle menu */
	toggle?: boolean;
	/** External reference */
	innerRef?: any;
	/** Tag type property */
	type?: string;
	/** Link url */
	href?: string;
}

export default class DropdownItem extends React.Component<DropdownItemProps> {
	static defaultProps = {
		tag: "button",
		toggle: true
	};

	static contextTypes = {
		toggle: PropTypes.func
	};

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
		const { className, divider, tag, header, active, innerRef, ...props } = omit(this.props, ["toggle"]);

		let Tag = tag as any;

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
				{this.props.children && this.props.children["type"] === Dropdown ? (
					this.props.children
				) : (
					<Tag
						type={
							Tag === "button" && (this.props.onClick || this.props.toggle)
								? "button"
								: undefined
						}
						{...props}
						role={this.role}
						className={classes}
						onClick={this.onItemClick}
						ref={innerRef}
					/>
				)}
			</li>
		);
	}
}
