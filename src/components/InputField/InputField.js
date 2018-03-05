import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import PropTypes from 'prop-types';

function InputField({ placeholder, required, disabled, errorMessage }) {
	return (
		<TextField
			required={required}
			disabled={disabled}
			errorMessage={errorMessage}
			placeholder={placeholder}
		/>
	);
}

InputField.propTypes = {
	/** Input field placeholder text */
	placeholder: PropTypes.string,
	/** Input field is marked with red asterisk as required if set to true */
	required: PropTypes.bool,
	/** Input field is disabled is set to true */
	disabled: PropTypes.bool,
	/** Error message shown under the input field */
	errorMessage: PropTypes.string
};

InputField.defaultProps = {
	disabled: false,
	required: false
};

export default InputField;
