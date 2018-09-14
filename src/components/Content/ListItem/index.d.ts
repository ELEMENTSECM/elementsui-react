import * as React from 'react';

export interface ListItemProps {
	/**
	 * Any JSX
	 */
	children?: any;
	/**
	 * onClick event handler
	 */
	onClick?: (...args: any[]) => any;
	/**
	 * Item link
	 */
	link?: string;
	/**
	 * Icon class name
	 */
	icon?: string;
	/**
	 * Icon color
	 */
	iconColor?: string;
	/**
	 * List item class name
	 */
	className?: string;
	/**
	 * Link className
	 */
	linkClassName?: string;
}

declare const ListItem: React.SFC<ListItemProps>;

export default ListItem;
