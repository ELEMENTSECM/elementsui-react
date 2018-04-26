import * as React from 'react';

export interface TooltipProps {
	/**
	 * Tooltip content
	 */
	content?: string;
}

export const Tooltip: React.SFC<TooltipProps>;
