import * as React from 'react';

export interface TooltipProps {
	/**
	 * HTML id tag of the root element
	 */
	id?: string;
	/**
	 * Tooltip content
	 */
	content?: string;
	/**
	 * User-defined styling
	 */
	styles?: (...args: any[]) => any;
}

declare const Tooltip: React.SFC<TooltipProps>;

export default Tooltip;
