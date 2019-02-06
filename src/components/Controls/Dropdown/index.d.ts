import * as React from "react";

export type DropdownDirection = "up" | "down" | "left" | "right";

export type DropdownAddonType = boolean | "prepend" | "append";

export interface DropdownProps {
	/**
	 * Is dropdown disabled
	 */
	disabled?: boolean;
	/**
	 * Open direction
	 */
	direction?: DropdownDirection;
	/**
	 * Is button group
	 */
	group?: boolean;
	/**
	 * Is dropdown open
	 */
	isOpen?: boolean;
	/**
	 * Is part of navigation menu
	 */
	nav?: boolean;
	/**
	 * Is dropdown active
	 */
	active?: boolean;
	/**
	 * Addon type
	 */
	addonType?: DropdownAddonType;
	/**
	 * Size
	 */
	size?: string;
	/**
	 * HTML element tag
	 */
	tag?: string;
	/**
	 * Toggle function
	 */
	toggle?: (...args: any[]) => any;
	/**
	 * Component children
	 */
	children?: React.ReactNode;
	/**
	 * Class name
	 */
	className?: string;
	/**
	 * Is in nav bar
	 */
	inNavbar?: boolean;
	/**
	 * Dropdoen is active if one of it's children is active
	 */
	setActiveFromChild?: boolean;
	/**
	 * Parent toggle
	 */
	parentToggle?: (...args: any[]) => any;
}

export default class Dropdown extends React.Component<DropdownProps, any> {
	render(): JSX.Element;
}
