import * as React from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { getStyles } from './InputField.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';

export function InputField(props) {
	const { placeholder, required, disabled, errorMessage, className, theme, getStyles } = props;
	const classNames = classNamesFunction()(getStyles, props);
	return (
		<TextField
			className={classNames.root}
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

export default styled(customizable('InputField', ['theme'])(InputField), getStyles);
