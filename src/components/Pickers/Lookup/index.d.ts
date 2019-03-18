import * as React from "react";

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
	menuPortal?: (...args: any[]) => any;
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

export type LookupMenuPlacement = "bottom" | "top" | "auto";

export type LookupNoOptionsMessage = ((...args: any[]) => any) | any;

export type LookupLoadingMessage = ((...args: any[]) => any) | any;

export interface LookupLabels {
	delete?: string;
}

export interface LookupProps {
	/**
	 * The id to set on the SelectContainer component
	 */
	id?: string;
	/**
	 * The id of the search input
	 */
	inputId?: string;
	/**
	 * Initial value
	 */
	value?: any;
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
	 * Renders text of selected option
	 */
	renderSelection?: (...args: any[]) => any;
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
	/**
	 * Value can be cleared
	 */
	isClearable?: boolean;
	/**
	 * Default placement of the menu in relation to the control. 'auto' will flip when there isn't enough space below the control.
	 */
	menuPlacement?: LookupMenuPlacement;
	/**
	 * Whether the menu should use a portal, and where it should attach
	 */
	menuPortalTarget?: Object;
	/**
	 * Text to display when there are no options
	 */
	noOptionsMessage?: LookupNoOptionsMessage;
	/**
	 * Async: Text to display when loading options
	 */
	loadingMessage?: LookupLoadingMessage;
	/**
	 * Include full object value
	 */
	fullObjectValue?: boolean;
	/**
	 * JSX elements to be rendered as draggable dialog when option is clicked
	 */
	popup?: (...args: any[]) => any;
	/**
	 * Is popup draggable
	 */
	isDraggable?: boolean;
	/**
	 * Draggable handle selector
	 */
	dragHandle?: string;
	/**
	 * Draggable dialog portal target Id
	 */
	draggablePortalTarget?: string;
	/**
	 * Always fetch values when menu opens
	 */
	alwaysRefresh?: boolean;
	/**
	 * Function that returns one or many records that will be appened to the result list
	 */
	customOptions?: (...args: any[]) => any;
	/**
	 * Aria label
	 */
	ariaLabel?: string;
	/**
	 * Labelled by Id
	 */
	ariaLabelledBy?: string;
	/**
	 * Labels
	 */
	labels?: LookupLabels;
	/**
	 * Allows search for values without filtering text
	 */
	allowSearchWithEmptyFilter?: boolean;
	/**
	 * Should multi lookup return values as delimiter-separated string
	 */
	multiAsString?: boolean;
	/**
	 * Delimiter used if format is enabled. Set to ";" by default
	 */
	delimiter?: string;
	/**
	 * Conditional css classes for option
	 */
	optionBindings?: (...args: any[]) => any;
	/**
	 * Conditional css classes for selection
	 */
	selectionBindings?: (...args: any[]) => any;
	/**
	 * Multi string lookup should initialize from ids string
	 */
	initMultiString?: boolean;
	/**
	 * Id field names filter query for initializing multi string lookup
	 */
	multiStringIdFilterString?: string;
	/**
	 * List of custom options for a lookup
	 */
	specialOptionValues?: any[];
	/**
	 * Allows control of whether the menu is opened when the Select is focused
	 */
	openMenuOnFocus?: boolean;
	/**
	 * This complex object includes all the compositional components that are used in react-select.
	 * If you wish to overwrite a component, pass in an object with the appropriate namespace.
	 */
	components?: Object;
	/**
	 * Include metadata odata property
	 */
	includeMetadata?: boolean;
}

export default class Lookup extends React.Component<LookupProps, any> {
	render(): JSX.Element;
}
