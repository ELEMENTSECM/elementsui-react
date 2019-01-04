import * as React from "react";
import PropTypes from "prop-types";
import DatePicker, { registerLocale } from "react-ada-datepicker";
import nls from "./DateTimePicker.nls.json";
import includes from "lodash/includes";
import en from "date-fns/locale/en-GB";
import sv from "date-fns/locale/sv";
import nb from "date-fns/locale/nb";
import DateTimeInput from "./DateTimeInput";

const localeMap = {
	en,
	sv,
	nb
};

class DateTimePicker extends React.Component {
	static defaultProps = {
		locale: "nb"
	};

	constructor(props) {
		super(props);
		const { dateFormat, timeFormat, viewMode, locale } = this.props;
		registerLocale(locale, localeMap[locale]);

		this.showTimeSelect = includes([ "datetime", "time" ], viewMode);
		this.showTimeSelectOnly = viewMode === "time";
		this.currentNls = nls[locale.substr(0, 2)];

		if (dateFormat === undefined) {
			this.dateFormatId = this.currentNls["date"];
		} else if (typeof dateFormat === "string") {
			this.dateFormatId = this.currentNls[`longDateFormat_${dateFormat}`];
		}

		if (timeFormat === undefined) {
			this.timeFormatId = this.currentNls["time"];
		} else if (typeof timeFormat === "string") {
			this.timeFormatId = this.currentNls[`longDateFormat_${timeFormat}`];
		}

		if (this.showTimeSelect) {
			this.dateFormatId += ` ${this.timeFormatId}`;
		}
	}

	render() {
		const { dateFormat, timeFormat, viewMode, disabled, defaultValue, todayButton, ...rest } = this.props;

		return (
			<DatePicker
				{...rest}
				todayButton={todayButton ? this.currentNls["todayLbl"] : null}
				selected={defaultValue}
				disabled={disabled}
				showTimeSelect={this.showTimeSelect}
				showTimeSelectOnly={this.showTimeSelectOnly}
				dateFormat={this.dateFormatId}
				timeFormat={this.timeFormatId}
				timeIntervals={15}
				shouldCloseOnSelect={true}
				customInput={<DateTimeInput />}
				adjustDateOnChange
			/>
		);
	}
}

DateTimePicker.propTypes = {
	/** HTML id tag of the root element */
	id: PropTypes.string,
	/** Input's 'name' attribute */
	name: PropTypes.string,
	/** Represents the selected date by the component, in order to use it as a controlled component. This prop is parsed by Moment.js, so it is possible to use a date string or a moment object. */
	value: PropTypes.oneOfType([ PropTypes.instanceOf(Date), PropTypes.string ]),
	/** Represents the selected date for the component to use it as a uncontrolled component. This prop is parsed by Moment.js, so it is possible to use a date string or a moment object. */
	defaultValue: PropTypes.oneOfType([ PropTypes.instanceOf(Date), PropTypes.string ]),
	/** Represents the month which is viewed on opening the calendar when there is no selected date. This prop is parsed by Moment.js, so it is possible to use a date string or a moment object. */
	viewDate: PropTypes.oneOfType([ PropTypes.instanceOf(Date), PropTypes.string ]),
	/** Defines the format for the date. */
	dateFormat: PropTypes.oneOfType([ PropTypes.oneOf([ "L", "LL", "LLL", "LLLL", "LT", "LTS" ]), PropTypes.bool ]),
	/** Defines the format for the time. */
	timeFormat: PropTypes.oneOfType([ PropTypes.oneOf([ "LT", "LTS" ]), PropTypes.bool ]),
	/** Manually set the locale for the react-datetime instance. Moment.js locale needs to be loaded to be used, see i18n docs. */
	locale: PropTypes.string,
	/** Callback trigger when the date changes. The callback receives the selected moment object as only parameter, if the date in the input is valid. If the date in the input is not valid, the callback receives the value of the input (a string). */
	onChange: PropTypes.func,
	/** Callback trigger for when the user clicks outside of the input, simulating a regular onBlur. The callback receives the selected moment object as only parameter, if the date in the input is valid. If the date in the input is not valid, the callback returned. */
	onBlur: PropTypes.func,
	/** The default view to display when the picker is shown  */
	viewMode: PropTypes.oneOf([ "date", "time", "datetime" ]),
	/** Extra class name for the outermost markup element. */
	className: PropTypes.string,
	/** Allowed dates from defined value */
	minDate: PropTypes.oneOfType([ PropTypes.instanceOf(Date), PropTypes.string ]),
	/** Allowed dates to defined value */
	maxDate: PropTypes.oneOfType([ PropTypes.instanceOf(Date), PropTypes.string ]),
	/** Input is disabled */
	disabled: PropTypes.bool,
	/** Input is required */
	required: PropTypes.bool,
	/** When true, once the day has been selected, the datepicker will be automatically closed. */
	closeOnSelect: PropTypes.bool,
	/** Allow same day selection */
	allowSameDay: PropTypes.bool,
	/** Show 'Today' button */
	todayButton: PropTypes.bool
};

export default DateTimePicker;
