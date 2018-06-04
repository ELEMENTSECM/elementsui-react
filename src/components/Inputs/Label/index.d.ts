import * as React from 'react';

export type LabelChildren = React.ReactNode[] | React.ReactNode;

export interface LabelProps {
	/**
	 * Label text (children are ignored if label is defined)
	 */
	label?: string;
	/**
	 * Label children
	 */
	children?: LabelChildren;
	/**
	 * Label required
	 */
	required?: boolean;
	/**
	 * Label disabled
	 */
	disabled?: boolean;
	/**
	 * User-defined styling
	 */
	styles?: (...args: any[]) => any;
}

declare const Label: React.SFC<LabelProps>;

export default Label;
