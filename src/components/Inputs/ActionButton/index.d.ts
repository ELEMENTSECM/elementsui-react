import * as React from 'react';

export interface ActionButtonIconProps {
	iconName?: string;
}

export interface ActionButtonProps {
	/**
	 * ActionButton label
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
	 * User-defined styling
	 */
	styles?: (...args: any[]) => any;
	/**
	 * ActionButton icon
	 */
	iconProps?: ActionButtonIconProps;
}

declare const ActionButton: React.SFC<ActionButtonProps>;

export default ActionButton;
