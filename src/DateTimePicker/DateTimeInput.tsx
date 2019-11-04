import * as React from "react";
import { InputGroup, FormControl } from "react-bootstrap";

interface DateTimeInputProps {
	onClick?: (e) => any;
	disabled?: boolean;
	showTimeSelectOnly?: boolean;
	[key: string]: any;
}

class DateTimeInput extends React.Component<DateTimeInputProps> {
	render() {
		const { onClick, disabled, showTimeSelectOnly, ...rest } = this.props;
		return (
			<InputGroup onClick={onClick}>
				<FormControl type="text" disabled={disabled} {...rest} />
				<InputGroup.Addon style={{ cursor: disabled ? "not-allowed" : "pointer" }}>
					<i className={`glyphicons glyphicons-${showTimeSelectOnly ? "clock" : "calendar"}`} />
				</InputGroup.Addon>
			</InputGroup>
		);
	}
}

export default DateTimeInput;
