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

export const Spinner: React.SFC<SpinnerProps>;
