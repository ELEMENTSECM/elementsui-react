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
	 * Primary button
	 */
	isPrimary?: boolean;
	/**
	 * User-defined styling
	 */
	styles?: (...args: any[]) => any;
	/**
	 * ActionButton icon
	 */
	iconProps?: ActionButtonIconProps;
}

const ActionButton: React.SFC<ActionButtonProps>;
