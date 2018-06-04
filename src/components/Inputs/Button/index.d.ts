import * as React from 'react';

export type ButtonChildren = React.ReactNode[] | React.ReactNode;

export interface ButtonProps {
	/**
	 * HTML id tag of the root element
	 */
	id?: string;
	/**
	 * Button label (children are ignored if label is defined)
	 */
	label?: string;
	/**
	 * Button children
	 */
	children?: ButtonChildren;
	/**
	 * Button is disabled
	 */
	disabled?: boolean;
	/**
	 * Mouse click event handler
	 */
	onClick?: (...args: any[]) => any;
	/**
	 * Primary button
	 */
	isPrimary?: boolean;
	/**
	 * User-defined styling
	 */
	styles?: (...args: any[]) => any;
}

declare const Button: React.SFC<ButtonProps>;

export default Button;
