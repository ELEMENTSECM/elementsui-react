import * as React from "react";
import PropTypes from "prop-types";
import Datetime from "react-datetime";
import { injectIntl, IntlProvider } from "react-intl";
import nls from "./DateTimePicker.nls.json";

function DateTimePicker(props) {
	function calculalateValidDates(current) {
		const dateFromValid = !props.dateFrom || current.isAfter(Datetime.moment(props.dateFrom).subtract(1, "day"));
		const dateToValid = !props.dateTo || current.isBefore(Datetime.moment(props.dateTo).add(1, "day"));

		return dateFromValid && dateToValid;
	}

	const DTPicker = injectIntl(({ intl }) => {
		const { dateFormat, timeFormat, viewMode } = props;
		let dateFormatId = false,
			timeFormatId = false;

		if (viewMode !== "time") {
			if (dateFormat === undefined) {
				dateFormatId = intl.formatMessage({ id: "date" });
			} else if (typeof dateFormat === "string") {
				dateFormatId = intl.formatMessage({ id: `longDateFormat_${dateFormat}` });
			}
		}

		if (timeFormat === undefined) {
			timeFormatId = intl.formatMessage({ id: "time" });
		} else if (typeof timeFormat === "string") {
			timeFormatId = intl.formatMessage({ id: `longDateFormat_${timeFormat}` });
		}

		return (
			<Datetime
				{...props}
				isValidDate={calculalateValidDates}
				inputProps={{ name: props.name, disabled: props.disabled, required: props.required }}
				dateFormat={dateFormatId}
				timeFormat={timeFormatId}
			/>
		);
	});

	return (
		<IntlProvider locale={props.locale} messages={nls[props.locale]}>
			<div id={props.id} className={props.className}>
				<DTPicker />
			</div>
		</IntlProvider>
	);
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
	locale: PropTypes.string.isRequired,
	/** Callback trigger when the date changes. The callback receives the selected moment object as only parameter, if the date in the input is valid. If the date in the input is not valid, the callback receives the value of the input (a string). */
	onChange: PropTypes.func,
	/** Callback trigger for when the user opens the datepicker. The callback receives an event of type SyntheticEvent. */
	onFocus: PropTypes.func,
	/** Callback trigger for when the user clicks outside of the input, simulating a regular onBlur. The callback receives the selected moment object as only parameter, if the date in the input is valid. If the date in the input is not valid, the callback returned. */
	onBlur: PropTypes.func,
	/** The default view to display when the picker is shown  */
	viewMode: PropTypes.oneOf([ "years", "months", "days", "time" ]),
	/** Extra class name for the outermost markup element. */
	className: PropTypes.string,
	/** Allowed dates from defined value */
	dateFrom: PropTypes.oneOfType([ PropTypes.instanceOf(Date), PropTypes.string ]),
	/** Allowed dates to defined value */
	dateTo: PropTypes.oneOfType([ PropTypes.instanceOf(Date), PropTypes.string ]),
	/** Input is disabled */
	disabled: PropTypes.bool,
	/** Input is required */
	required: PropTypes.bool
};

export default DateTimePicker;