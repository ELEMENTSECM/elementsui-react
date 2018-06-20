import * as React from 'react';

export interface ListItemProps {
	/**
	 * ListItem title
	 */
	title?: string;
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
