import * as React from "react";

export interface DropdownMenuProps {
	/**
	 * Customize component output by passing in an element name or Component
	 */
	tag?: string;
	/**
	 * Component children
	 */
	children: React.ReactNode;
	/**
	 * Placement
	 */
	right?: boolean;
	/**
	 * Modifier used to flip the popper’s placement when it starts to overlap its reference element.
	 */
	flip?: boolean;
	/**
	 * Plugins used to alter the popper behavior
	 */
	modifiers?: Object;
	/**
	 * Class name
	 */
	className?: string;
	/**
	 * Should menu persist
	 */
	persist?: boolean;
}

declare const DropdownMenu: React.SFC<DropdownMenuProps>;

export default DropdownMenu;
