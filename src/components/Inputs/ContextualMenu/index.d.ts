import * as React from 'react';

export interface ContextualMenuMenuProps {
	items?: any[];
}

export interface ContextualMenuMenuIconProps {
	iconName?: string;
	ariaLabel?: string;
	iconType?: 0 | 1;
}

export interface ContextualMenuProps {
	/**
	 * HTML id tag of the root element
	 */
	id?: string;
	/**
	 * ContextualMenu primary
	 */
	isPrimary?: boolean;
	/**
	 * ContextualMenu button text
	 */
	buttonText?: string;
	/**
	 * ContextualMenu button ariaLabel
	 */
	ariaLabel?: string;
	/**
	 * ContextualMenu menuitems
	 */
	menuProps: ContextualMenuMenuProps;
	/**
	 * Contextual menu icon properties
	 */
	menuIconProps?: ContextualMenuMenuIconProps;
	/**
	 * User-defined styling
	 */
	styles?: (...args: any[]) => any;
}

declare const ContextualMenu: React.SFC<ContextualMenuProps>;

export default ContextualMenu;
