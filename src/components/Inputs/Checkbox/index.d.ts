import * as React from 'react';

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
	/**
	 * User-defined styling
	 */
	getStyles?: (...args: any[]) => any;
}

declare const Checkbox: React.SFC<CheckboxProps>;

export default Checkbox;
