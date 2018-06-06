import * as React from 'react';

export interface CheckboxProps {
	/**
	 * HTML id tag of the root element
	 */
	htmlId?: string;
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
	styles?: (...args: any[]) => any;
}

declare const Checkbox: React.SFC<CheckboxProps>;

export default Checkbox;
