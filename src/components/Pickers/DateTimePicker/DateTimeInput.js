import * as React from "react";
import { InputGroup, FormControl } from "react-bootstrap";

export default class DateTimeInput extends React.PureComponent {
	render() {
		const { onClick, disabled, showTimeSelectOnly, ...rest } = this.props;
		return (
			<InputGroup onClick={onClick}>
				<FormControl type="text" disabled={disabled} {...rest} />
				<InputGroup.Addon onClick={this.onIconClick} style={{ cursor: disabled ? "not-allowed" : "pointer" }}>
					<i className={`glyphicons glyphicons-${showTimeSelectOnly ? "clock" : "calendar"}`} />
				</InputGroup.Addon>
			</InputGroup>
		);
	}
}
