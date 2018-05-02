import * as React from 'react';

export interface DropdownOptions {
	key: any;
	text: string;
	isSelected?: boolean;
}

export interface DropdownProps {
	/**
	 * DOM element id
	 */
	id?: string;
	/**
	 * Dropdown label
	 */
	label?: string;
	/**
	 * The key of the selected element
	 */
	selectedKey?: any;
	/**
	 * Default placeholder
	 */
	placeHolder?: string;
	/**
	 * Dropdown options
	 */
	options: DropdownOptions[];
	/**
	 * onChange event handler function
	 */
	onChange?: (...args: any[]) => any;
	/**
	 * User-defined styling
	 */
	getStyles?: (...args: any[]) => any;
}

export const Dropdown: React.SFC<DropdownProps>;
