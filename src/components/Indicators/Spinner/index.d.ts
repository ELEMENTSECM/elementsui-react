import * as React from 'react';

export interface SpinnerProps {
	/**
	 * HTML id tag of the root element
	 */
	htmlId?: string;
	/**
	 * Spinner label
	 */
	label?: string;
	/**
	 * User-defined styling
	 */
	styles?: (...args: any[]) => any;
}

declare const Spinner: React.SFC<SpinnerProps>;

export default Spinner;
