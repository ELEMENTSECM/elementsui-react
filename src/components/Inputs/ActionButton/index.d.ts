import * as React from 'react';

export interface ActionButtonIconProps {
	iconName?: string;
}

export type ActionButtonChildren = React.ReactNode[] | React.ReactNode;

export interface ActionButtonProps {
	/**
	 * ActionButton label (children are ignored if label is defined)
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
	/**
	 * Label as children
	 */
	children?: ActionButtonChildren;
}

declare const ActionButton: React.SFC<ActionButtonProps>;

export default ActionButton;
