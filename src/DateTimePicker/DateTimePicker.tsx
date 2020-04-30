import * as React from "react";
import DatePicker, { registerLocale } from "react-ada-datepicker";
import { nls } from "./DateTimePicker.nls";
import includes from "lodash/includes";
import en from "date-fns/locale/en-GB";
import sv from "date-fns/locale/sv";
import nb from "date-fns/locale/nb";
import nn from "date-fns/locale/nn";
import DateTimeInput from "./DateTimeInput";
import { Portal } from "react-overlays";

const localeMap = {
	en,
	sv,
	nb,
	nn
};

const getPortalContainer = container => {
	return ({ children }) => <Portal container={container}>{children}</Portal>;
};

export interface DateTimePickerProps {
	/** HTML id tag of the root element */
	id?: string;
	/** Input's 'name' attribute */
	name?: string;
	/** Represents the selected date by the component, in order to use it as a controlled component. This prop is parsed by Moment.js, so it is possible to use a date string or a moment object. */
	value?: Date | string;
	/** Represents the selected date for the component to use it as a uncontrolled component. This prop is parsed by Moment.js, so it is possible to use a date string or a moment object. */
	defaultValue?: Date | string;
	/** Represents the month which is viewed on opening the calendar when there is no selected date. This prop is parsed by Moment.js, so it is possible to use a date string or a moment object. */
	viewDate?: Date | string;
	/** Defines the format for the date. */
	dateFormat?: "L" | "LL" | "LLL" | "LLLL" | "LT" | "LTS" | boolean;
	/** Defines the format for the time. */
	timeFormat?: "LT" | "LTS" | boolean;
	/** Manually set the locale for the react-datetime instance. Moment.js locale needs to be loaded to be used, see i18n docs. */
	locale?: string;
	/** Callback trigger when the date changes. The callback receives the selected moment object as only parameter, if the date in the input is valid. If the date in the input is not valid, the callback receives the value of the input (a string). */
	onChange?: (e) => any;
	/** Callback trigger for when the user clicks outside of the input, simulating a regular onBlur. The callback receives the selected moment object as only parameter, if the date in the input is valid. If the date in the input is not valid, the callback returned. */
	onBlur?: (e) => any;
	/** The default view to display when the picker is shown  */
	viewMode?: "date" | "time" | "datetime";
	/** Extra class name for the outermost markup element. */
	className?: string;
	/** Allowed dates from defined value */
	minDate?: Date | string;
	/** Allowed dates to defined value */
	maxDate?: Date | string;
	/** Input is disabled */
	disabled?: boolean;
	/** Input is required */
	required?: boolean;
	/** When true, once the day has been selected, the datepicker will be automatically closed. */
	closeOnSelect?: boolean;
	/** Allow same day selection */
	allowSameDay?: boolean;
	/** Show 'Today' button */
	todayButton?: boolean;
	/** Portal popup to element (ReactNode or Function) */
	portalPopupTo?: React.ReactNode;
	/** Show datepicker inline */
	inline?: boolean;
}

export default class DateTimePicker extends React.Component<DateTimePickerProps> {
	static defaultProps = {
		locale: "nb"
	};
	showTimeSelect = false;
	showTimeSelectOnly = false;
	currentNls = null;
	dateFormatId = "";
	timeFormatId = "";
	popperContainer: any = null;

	constructor(props) {
		super(props);
		const { dateFormat, timeFormat, viewMode, locale, portalPopupTo } = this.props;
		registerLocale(locale, localeMap[locale!]);

		this.showTimeSelect = includes(["datetime", "time"], viewMode);
		this.showTimeSelectOnly = viewMode === "time";
		this.currentNls = nls[locale!.substr(0, 2)];

		if (dateFormat === undefined) {
			this.dateFormatId = this.currentNls!["date"];
		} else if (typeof dateFormat === "string") {
			this.dateFormatId = this.currentNls![`longDateFormat_${dateFormat}`];
		}

		if (timeFormat === undefined) {
			this.timeFormatId = this.currentNls!["time"];
		} else if (typeof timeFormat === "string") {
			this.timeFormatId = this.currentNls![`longDateFormat_${timeFormat}`];
		}

		if (portalPopupTo) {
			this.popperContainer = getPortalContainer(portalPopupTo);
		}

		if (this.showTimeSelectOnly) {
			return;
		}

		if (this.showTimeSelect) {
			this.dateFormatId += ` ${this.timeFormatId}`;
		}
	}

	render() {
		const { dateFormat, timeFormat, viewMode, disabled, defaultValue, todayButton, inline, ...rest } = this.props;

		return (
			<DatePicker
				{...rest}
				todayButton={todayButton ? this.currentNls!["todayLbl"] : null}
				selected={defaultValue}
				disabled={disabled}
				showTimeSelect={this.showTimeSelect}
				showTimeSelectOnly={this.showTimeSelectOnly}
				dateFormat={this.dateFormatId}
				timeFormat={this.timeFormatId}
				timeIntervals={15}
				shouldCloseOnSelect={true}
				customInput={<DateTimeInput />}
				popperContainer={this.popperContainer}
				adjustDateOnChange
				inline={inline}
			/>
		);
	}
}
