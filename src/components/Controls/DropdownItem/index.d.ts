import * as React from "react";

export type DropdownItemTag = ((...args: any[]) => any) | string;

export interface DropdownItemProps {
	/**
	 * Component children
	 */
	children?: React.ReactNode;
	/**
	 * Is item active
	 */
	active?: boolean;
	/**
	 * Is item disabled
	 */
	disabled?: boolean;
	/**
	 * Is item a divider
	 */
	divider?: boolean;
	/**
	 * HTML element tag
	 */
	tag?: DropdownItemTag;
	/**
	 * Is item a header
	 */
	header?: boolean;
	/**
	 * onClickevent handler
	 */
	onClick?: (...args: any[]) => any;
	/**
	 * Class name
	 */
	className?: string;
	/**
	 * Should toggle menu
	 */
	toggle?: boolean;
}

export default class DropdownItem extends React.Component<DropdownItemProps, any> {
	render(): JSX.Element;
}
