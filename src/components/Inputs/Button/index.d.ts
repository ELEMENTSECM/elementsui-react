import * as React from 'react';

export interface ButtonProps {
	/**
	 * HTML id tag of the root element
	 */
	htmlId?: string;
	/**
	 * Button label
	 */
	label?: string;
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
