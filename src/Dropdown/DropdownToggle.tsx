import * as React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Reference } from "react-popper";

export interface DropdownToggleProps {
	/** Show caret */
	caret?: boolean;
	/** Toggle color */
	color?: string;
	/** Class name */
	className?: string;
	/** Toggle is disabled */
	disabled?: boolean;
	/** onClickevent handler */
	onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	"aria-haspopup"?: boolean;
	split?: boolean;
	/** Element HTML tag */
	tag?: React.ComponentType | keyof JSX.IntrinsicElements;
	/** Is part of navigation menu */
	nav?: boolean;
	/** Is menuitem */
	menuItem?: boolean;
	/** Title attribute value */
	title?: HTMLElement["title"];
}

export default class DropdownToggle extends React.Component<DropdownToggleProps> {
	static defaultProps = {
		"aria-haspopup": true,
		color: "secondary",
	};

	static contextTypes = {
		isOpen: PropTypes.bool.isRequired,
		toggle: PropTypes.func.isRequired,
		inNavbar: PropTypes.bool.isRequired,
	};

	onClick = (e) => {
		const { disabled, nav, tag, onClick } = this.props;
		if (disabled) {
			e.preventDefault();
			return;
		}

		if (nav && !tag) {
			e.preventDefault();
		}

		onClick?.(e);
		this.context.toggle(e);
	};

	render() {
		const { className, color, caret, split, nav, tag, menuItem, title, ...props } = this.props;
		const ariaLabel = props["aria-label"] || "Toggle Dropdown";
		let classes = classNames(className, {
			"dropdown-item": menuItem,
			"dropdown-toggle": caret || split,
			"dropdown-toggle-split": split,
			"nav-link": nav,
		});
		const children = props.children || <span className="sr-only">{ariaLabel}</span>;

		let Tag;
		const tagProps = { ...props } as any;

		if (nav && !tag) {
			Tag = "a";
			tagProps.href = "#";
		} else if (!tag) {
			Tag = "button";
			classes = classNames(classes, "btn btn-default");
			tagProps.color = color;
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
					role={menuItem ? "menuitem" : undefined}
				/>
			);
		}

		return (
			<Reference>
				{({ ref }) => (
					<Tag
						className={classes}
						type={Tag === "button" ? "button" : undefined}
						onClick={this.onClick}
						aria-expanded={this.context.isOpen}
						ref={ref}
						role={menuItem ? "menuitem" : undefined}
						disabled={props.disabled}
						title={title}
					>
						{children}
					</Tag>
				)}
			</Reference>
		);
	}
}
