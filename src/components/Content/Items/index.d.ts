import * as React from "react";

export interface ItemsProps {
	/**
	 * CSS class name for container element holding items
	 */
	containerClassName?: string;
	/**
	 * CSS class name of item element
	 */
	itemClassName?: string;
	/**
	 * Function to return contents of item element
	 */
	renderItem: (...args: any[]) => any;
	/**
	 * Array of items
	 */
	items: any[];
	/**
	 * Function called when remove button is clicked on item element
	 */
	onItemRemove: (...args: any[]) => any;
}

declare const Items: React.SFC<ItemsProps>;

export default Items;
