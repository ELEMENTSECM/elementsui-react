import * as React from "react";

export type DropdownToggleTag = ((...args: any[]) => any) | string;

export interface DropdownToggleProps {
	/**
	 * Show caret
	 */
	caret?: boolean;
	/**
	 * Toggle color
	 */
	color?: string;
	/**
	 * Component children
	 */
	children?: React.ReactNode;
	/**
	 * Class name
	 */
	className?: string;
	/**
	 * Toggle is disabled
	 */
	disabled?: boolean;
	/**
	 * onClickevent handler
	 */
	onClick?: (...args: any[]) => any;
	"aria-haspopup"?: boolean;
	split?: boolean;
	/**
	 * Element HTML tag
	 */
	tag?: DropdownToggleTag;
	/**
	 * Is part of navigation menu
	 */
	nav?: boolean;
	/**
	 * Is menuitem
	 */
	menuItem?: boolean;
}

export default class DropdownToggle extends React.Component<DropdownToggleProps, any> {
	render(): JSX.Element;
}
