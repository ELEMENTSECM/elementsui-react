import * as React from 'react';

export interface BasePickerProps {
	/**
	 * Sets focus to the focus zone
	 */
	focus: boolean;
	/**
	 * Set focus to the input
	 */
	focusInput: boolean;
	/**
	 * Callback when filtering
	 */
	onResolveSuggestions: (...args: any[]) => any;
	/**
	 * Text input suggestion
	 */
	getTextFromItem?: (...args: any[]) => any;
	/**
	 * Suggestion dropdown props
	 */
	pickerSuggestionsProps?: Object;
	/**
	 * Input props
	 */
	inputProps?: Object;
	/**
	 * Restrict the amount of selectable items.
	 */
	itemLimit?: number;
	/**
	 * User-defined styling
	 */
	styles?: (...args: any[]) => any;
}

declare const BasePicker: React.SFC<BasePickerProps>;

export default BasePicker;
