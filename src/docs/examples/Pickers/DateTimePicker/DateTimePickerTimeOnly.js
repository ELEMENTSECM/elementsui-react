import * as React from "react";
import DateTimePicker from "elementsui-react/Pickers/DateTimePicker";

/** TimePicker */
export default class DateTimePickerTimeOnly extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			time: new Date()
		};
	}

	onChange = (moment) => {
		const time = moment.toDate();
		this.setState((ps) => ({ time }));
	};

	render() {
		return (
			<DateTimePicker
				locale="nb"
				viewMode="time"
				defaultValue={this.state.time}
				onChange={(value) => this.onChange(value)}
				timeFormat="LT"
			/>
		);
	}
}
