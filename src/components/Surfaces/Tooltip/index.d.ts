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

export const Tooltip: React.SFC<TooltipProps>;
