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
	/** Do you want a fancy placeholder? */
	placeholder: PropTypes.string,
	required: PropTypes.bool,
	disabled: PropTypes.bool,
	errorMessage: PropTypes.string
};

export default InputField;
