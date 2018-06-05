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
	styles?: (...args: any[]) => any;
}

declare const Toggle: React.SFC<ToggleProps>;

export default Toggle;
