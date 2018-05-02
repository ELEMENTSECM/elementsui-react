import * as React from 'react';

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
	/**
	 * User-defined styling
	 */
	getStyles?: (...args: any[]) => any;
}

export const Toggle: React.SFC<ToggleProps>;
