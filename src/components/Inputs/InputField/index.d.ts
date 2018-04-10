import * as React from 'react';

export interface InputFieldProps {
	/**
	 * Input field placeholder text
	 */
	placeholder?: string;
	/**
	 * Input field is marked with red asterisk as required if set to true
	 */
	required?: boolean;
	/**
	 * Input field is disabled is set to true
	 */
	disabled?: boolean;
	/**
	 * Error message shown under the input field
	 */
	errorMessage?: string;
}

export const InputField: React.SFC<InputFieldProps>;
