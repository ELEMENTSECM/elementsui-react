import * as React from "react";
import Datetime from "react-datetime-contrib";
import { injectIntl, IntlProvider } from "react-intl";
import { nls } from "./DateTimePicker.nls";

export type DateTimePickerValue = Date | string;

export type DateTimePickerDefaultValue = Date | string;

export type DateTimePickerViewDate = Date | string;

export type DateTimePickerDateFormat = "L" | "LL" | "LLL" | "LLLL" | "LT" | "LTS" | boolean;

export type DateTimePickerTimeFormat = "LT" | "LTS" | boolean;

export type DateTimePickerViewMode = "years" | "months" | "days" | "time";

export type DateTimePickerDateFrom = Date | string;

export type DateTimePickerDateTo = Date | string;

export interface IDateTimePickerProps {
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
	locale: string;
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
	dateFrom?: DateTimePickerDateFrom;
	/**
	 * Allowed dates to defined value
	 */
	dateTo?: DateTimePickerDateTo;
	/**
	 * Input is disabled
	 */
	disabled?: boolean;
	/**
	 * Input is required
	 */
	required?: boolean;
}

class DateTimePicker extends React.Component<IDateTimePickerProps> {
	private input: React.RefObject<Datetime>;

	constructor(props: IDateTimePickerProps) {
		super(props);
		this.input = React.createRef();
	}

	calculalateValidDates = (current) => {
		const dateFromValid =
			!this.props.dateFrom || current.isAfter(Datetime["moment"](this.props.dateFrom).subtract(1, "day"));
		const dateToValid = !this.props.dateTo || current.isBefore(Datetime["moment"](this.props.dateTo).add(1, "day"));

		return dateFromValid && dateToValid;
	};

	onBlur = () => {
		// tslint:disable-next-line:no-unused-expression
		this.props.onBlur && this.props.onBlur(this.input.current.state.selectedDate);
	};

	render() {
		const { name, disabled, required, dateFormat, timeFormat, viewMode, onBlur, onChange, ...rest } = this.props;
		const DTPicker = injectIntl(({ intl }) => {
			let dateFormatId: string | boolean = false;
			let timeFormatId: string | boolean = false;

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
					{...rest}
					ref={this.input}
					isValidDate={this.calculalateValidDates}
					inputProps={{ name, disabled, required }}
					dateFormat={dateFormatId}
					timeFormat={timeFormatId}
					onBlur={this.onBlur}
				/>
			);
		});

		return (
			<IntlProvider locale={this.props.locale} messages={nls[this.props.locale]}>
				<div id={this.props.id} className={this.props.className}>
					<DTPicker />
				</div>
			</IntlProvider>
		);
	}
}

export default DateTimePicker;
