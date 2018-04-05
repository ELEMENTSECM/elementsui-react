/* Auto-generated code. Do not modify manually */
declare module 'elementsui-react' {
	import * as React from 'react';

	export interface SpinnerProps {
		/**
		 * Spinner label
		 */
		label?: string;
	}

	export const Spinner: React.SFC<SpinnerProps>;

	export interface ButtonProps {
		/**
		 * Button label
		 */
		label?: string;
		/**
		 * Button is disabled
		 */
		disabled?: boolean;
	}

	export const Button: React.SFC<ButtonProps>;

	export interface CheckboxProps {
		/**
		 * Checkbox label
		 */
		label?: string;
		/**
		 * Checkbox is disabled
		 */
		disabled?: boolean;
		/**
		 * Checkbox description
		 */
		ariaDescribedBy?: string;
	}

	export const Checkbox: React.SFC<CheckboxProps>;

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

	export interface ToggleProps {
		/**
		 * Toggle label
		 */
		label?: string;
		/**
		 * Toggle is disabled
		 */
		disabled?: boolean;
		/**
		 * Toggle description
		 */
		ariaDescribedBy?: string;
		/**
		 * Toggle checked
		 */
		defaultChecked?: boolean;
	}

	export const Toggle: React.SFC<ToggleProps>;
}
