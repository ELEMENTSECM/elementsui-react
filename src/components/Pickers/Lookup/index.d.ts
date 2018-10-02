import * as React from 'react';

export interface LookupStyles {
	clearIndicator?: (...args: any[]) => any;
	container?: (...args: any[]) => any;
	control?: (...args: any[]) => any;
	dropdownIndicator?: (...args: any[]) => any;
	group?: (...args: any[]) => any;
	groupHeading?: (...args: any[]) => any;
	indicatorsContainer?: (...args: any[]) => any;
	indicatorsSeparator?: (...args: any[]) => any;
	input?: (...args: any[]) => any;
	loadingIndicator?: (...args: any[]) => any;
	loadingMessage?: (...args: any[]) => any;
	menu?: (...args: any[]) => any;
	menuList?: (...args: any[]) => any;
	multiValue?: (...args: any[]) => any;
	multiValueLabel?: (...args: any[]) => any;
	multiValueRemove?: (...args: any[]) => any;
	noOptionsMessage?: (...args: any[]) => any;
	option?: (...args: any[]) => any;
	placeholder?: (...args: any[]) => any;
	singleValue?: (...args: any[]) => any;
	valueContainer?: (...args: any[]) => any;
}

export interface LookupProps {
	/**
	 * Initial value
	 */
	initialValue?: any;
	/**
	 * If true, the box will be unselectable, can be changed on the fly
	 */
	disabled?: boolean;
	/**
	 * Callback executed when a value has been selected
	 */
	onChange?: (...args: any[]) => any;
	/**
	 * Renders text for each search result line
	 */
	renderOption?: (...args: any[]) => any;
	/**
	 * Used to retrieve a key from entity record, by default uses Entity.key property (that in turn returns Id)
	 */
	idSelector?: (...args: any[]) => any;
	/**
	 * Function that returns odata query for provied search term
	 */
	queryProvider?: (...args: any[]) => any;
	/**
	 * Used to filter result set before rendering dropdown
	 */
	resultsFilter?: (...args: any[]) => any;
	/**
	 * Scroll pagination. 20 by default
	 */
	pageSize?: number;
	/**
	 * Throttle delay, 300 ms by default
	 */
	delay?: number;
	/**
	 * A custom error message otherwise the general error message will be used
	 */
	errorMessage?: string;
	/**
	 * Reference to select element
	 */
	selectRef?: (...args: any[]) => any;
	/**
	 * Lookup options
	 */
	options?: Object[];
	/**
	 * Placeholder
	 */
	placeholder?: string;
	/**
	 * Root element's class name
	 */
	className?: string;
	/**
	 * Allow the user to select multiple values
	 */
	isMulti?: boolean;
	/**
	 * Custom styles
	 */
	styles?: LookupStyles;
	/**
	 * Theme override
	 */
	theme?: (...args: any[]) => any;
}

export default class Lookup extends React.Component<LookupProps, any> {
	render(): JSX.Element;
}