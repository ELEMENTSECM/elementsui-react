import * as React from 'react';

export interface ButtonProps {
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
	onCLick?: (...args: any[]) => any;
	/**
	 * Primary button
	 */
	isPrimary?: boolean;
	/**
	 * User-defined styling
	 */
	getStyles?: (...args: any[]) => any;
}

declare const Button: React.SFC<ButtonProps>;

export default Button;
