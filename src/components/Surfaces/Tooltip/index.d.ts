import * as React from 'react';

export interface TooltipProps {
	/**
	 * Tooltip content
	 */
	content?: string;
	/**
	 * User-defined styling
	 */
	getStyles?: (...args: any[]) => any;
}

declare const Tooltip: React.SFC<TooltipProps>;

export default Tooltip;
