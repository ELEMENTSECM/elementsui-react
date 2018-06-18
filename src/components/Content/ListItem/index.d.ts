import * as React from 'react';

export interface ListItemProps {
	/**
	 * Any JSX
	 */
	children?: string;
	/**
	 * onClick event handler
	 */
	onClick?: (...args: any[]) => any;
	/**
	 * Item link
	 */
	link?: string;
	/**
	 * User-defined styling
	 */
	styles?: (...args: any[]) => any;
}

declare const ListItem: React.SFC<ListItemProps>;

export default ListItem;
