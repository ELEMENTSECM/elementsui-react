import * as React from "react";
import DateTimePicker from "elementsui-react/Pickers/DateTimePicker";

/** DateTimePicker */
export default function DateTimePickerDefault() {
	function addDays(date, days) {
		var result = new Date(date);
		result.setDate(result.getDate() + days);
		return result;
	}

	const dateFrom = Date();
	const dateTo = addDays(dateFrom, 10);
	return (
		<DateTimePicker
			locale="en"
			dateFrom={dateFrom}
			dateTo={dateTo}
			defaultValue={new Date()}
			onChange={(value) => alert(value)}
			dateFormat="LLL"
			timeFormat="LT"
		/>
	);
}
