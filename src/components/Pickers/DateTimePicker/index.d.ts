import * as React from "react";

export type DateTimePickerValue = Date | string;

export type DateTimePickerDefaultValue = Date | string;

export type DateTimePickerViewDate = Date | string;

export type DateTimePickerDateFormat = "L" | "LL" | "LLL" | "LLLL" | "LT" | "LTS" | boolean;

export type DateTimePickerTimeFormat = "LT" | "LTS" | boolean;

export type DateTimePickerViewMode = "date" | "time" | "datetime";

export type DateTimePickerMinDate = Date | string;

export type DateTimePickerMaxDate = Date | string;

export interface DateTimePickerProps {
	/**
	 * HTML id tag of the root element
	 */
	id?: string;
	/**
	 * Input's 'name' attribute
	 */
	name?: string;
	/**
	 * Represents the selected date by the component, in order to use it as a controlled component. This prop is parsed by Moment.js, so it is possible to use a date string or a moment object.
	 */
	value?: DateTimePickerValue;
	/**
	 * Represents the selected date for the component to use it as a uncontrolled component. This prop is parsed by Moment.js, so it is possible to use a date string or a moment object.
	 */
	defaultValue?: DateTimePickerDefaultValue;
	/**
	 * Represents the month which is viewed on opening the calendar when there is no selected date. This prop is parsed by Moment.js, so it is possible to use a date string or a moment object.
	 */
	viewDate?: DateTimePickerViewDate;
	/**
	 * Defines the format for the date.
	 */
	dateFormat?: DateTimePickerDateFormat;
	/**
	 * Defines the format for the time.
	 */
	timeFormat?: DateTimePickerTimeFormat;
	/**
	 * Manually set the locale for the react-datetime instance. Moment.js locale needs to be loaded to be used, see i18n docs.
	 */
	locale?: string;
	/**
	 * Callback trigger when the date changes. The callback receives the selected moment object as only parameter, if the date in the input is valid. If the date in the input is not valid, the callback receives the value of the input (a string).
	 */
	onChange?: (...args: any[]) => any;
	/**
	 * Callback trigger for when the user clicks outside of the input, simulating a regular onBlur. The callback receives the selected moment object as only parameter, if the date in the input is valid. If the date in the input is not valid, the callback returned.
	 */
	onBlur?: (...args: any[]) => any;
	/**
	 * The default view to display when the picker is shown
	 */
	viewMode?: DateTimePickerViewMode;
	/**
	 * Extra class name for the outermost markup element.
	 */
	className?: string;
	/**
	 * Allowed dates from defined value
	 */
	minDate?: DateTimePickerMinDate;
	/**
	 * Allowed dates to defined value
	 */
	maxDate?: DateTimePickerMaxDate;
	/**
	 * Input is disabled
	 */
	disabled?: boolean;
	/**
	 * Input is required
	 */
	required?: boolean;
	/**
	 * When true, once the day has been selected, the datepicker will be automatically closed.
	 */
	closeOnSelect?: boolean;
	/**
	 * Allow same day selection
	 */
	allowSameDay?: boolean;
	/**
	 * Show 'Today' button
	 */
	todayButton?: boolean;
	/**
	 * Portal popup to element (ReactNode or Function)
	 */
	portalPopupTo?: any;
}

export default class DateTimePicker extends React.Component<DateTimePickerProps, any> {
	render(): JSX.Element;
}
