import * as React from 'react';

export interface LabelProps {
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
	getStyles?: (...args: any[]) => any;
}

export const Label: React.SFC<LabelProps>;
