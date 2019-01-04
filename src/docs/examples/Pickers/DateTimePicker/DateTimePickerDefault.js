import * as React from "react";
import DateTimePicker from "elementsui-react/Pickers/DateTimePicker";

/** DateTimePicker */
export default class DateTimePickerDefault extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: new Date()
		};
	}

	onChange = value => {
		this.setState({ value: value });
	};

	render() {
		return (
			<div>
				<DateTimePicker
					locale="nb"
					defaultValue={this.state.value}
					onChange={this.onChange}
					allowSameDay={true}
					viewMode="datetime"
					dateFormat="L"
					timeFormat="LT"
					todayButton
				/>
			</div>
		);
	}
}
