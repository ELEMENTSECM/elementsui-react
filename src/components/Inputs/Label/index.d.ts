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
}

export const Label: React.SFC<LabelProps>;
