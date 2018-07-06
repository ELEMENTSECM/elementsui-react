import * as React from 'react';

export interface DropdownOptions {
	key: any;
	text: string;
	isSelected?: boolean;
	data?: Object;
}

export type DropdownResponsiveMode = 0 | 1 | 2 | 3 | 4 | 5;

export type DropdownDefaultSelectedKeys = string[] | number[];

export type DropdownSelectedKeys = string[] | number[];

export interface DropdownProps {
	/**
	 * HTML id tag of the root element
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
	 * Callback issues when the options callout is dismissed
	 */
	onDismiss?: (...args: any[]) => any;
	/**
	 * Optional custom renderer for the ISelectableDroppableText option content
	 */
	onRenderOption?: (...args: any[]) => any;
	/**
	 * Optional custom renderer for placeholder text
	 */
	onRenderPlaceHolder?: (...args: any[]) => any;
	/**
	 * Optional custom renderer for selected option displayed in input
	 */
	onRenderTitle?: (...args: any[]) => any;
	/**
	 * Optional custom renderer for chevron icon
	 */
	onRenderCaretDown?: (...args: any[]) => any;
	/**
	 * Custom width for dropdown. If value is 0, width of the input field is used.
	 */
	dropdownWidth?: number;
	/**
	 * Reponsive mode. 0 - small, 1 - medium, 2 - large, 3 - xLarge, 4 - xxLarge, 5 - xxxLarge
	 */
	responsiveMode?: DropdownResponsiveMode;
	/**
	 * Optional mode indicates if multi-choice selections is allowed.  Default to false
	 */
	multiSelect?: boolean;
	/**
	 * Keys that will be initially used to set selected items.
	 */
	defaultSelectedKeys?: DropdownDefaultSelectedKeys;
	/**
	 * Keys of the selected items. If you provide this, you must maintain selection
	 * state by observing onChange events and passing a new value in when changed.
	 */
	selectedKeys?: DropdownSelectedKeys;
	/**
	 * When multiple items are selected, this still will be used to separate values in the dropdown title.
	 */
	multiSelectDelimiter?: string;
	/**
	 * User-defined styling
	 */
	styles?: (...args: any[]) => any;
}

declare const Dropdown: React.SFC<DropdownProps>;

export default Dropdown;
