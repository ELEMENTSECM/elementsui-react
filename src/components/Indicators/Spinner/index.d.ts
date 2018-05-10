import * as React from 'react';

export interface SpinnerProps {
	/**
	 * Spinner label
	 */
	label?: string;
	/**
	 * User-defined styling
	 */
	getStyles?: (...args: any[]) => any;
}

declare const Spinner: React.SFC<SpinnerProps>;

export default Spinner;
