import * as React from 'react';

export interface DropdownOptions {
	key: any;
	text: string;
	isSelected?: boolean;
}

export interface DropdownProps {
	/**
	 * HTML id tag of the root element
	 */
	htmlId?: string;
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
	styles?: (...args: any[]) => any;
}

declare const Dropdown: React.SFC<DropdownProps>;

export default Dropdown;
