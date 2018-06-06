import * as React from 'react';

export interface LabelProps {
	/**
	 * HTML id tag of the root element
	 */
	htmlId?: string;
	/**
	 * Label required
	 */
	required?: boolean;
	/**
	 * Label disabled
	 */
	disabled?: boolean;
	/**
	 * Label  label
	 */
	label: string;
	/**
	 * User-defined styling
	 */
	styles?: (...args: any[]) => any;
}

declare const Label: React.SFC<LabelProps>;

export default Label;
