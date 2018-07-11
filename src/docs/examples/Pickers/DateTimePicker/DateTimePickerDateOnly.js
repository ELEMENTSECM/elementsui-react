import * as React from "react";
import DateTimePicker from "elementsui-react/Pickers/DateTimePicker";

/** DatePicker */
export default function DateTimePickerDefault() {
	return <DateTimePicker locale="en" dateFormat="L" timeFormat={false} />;
}
