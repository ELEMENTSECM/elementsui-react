import * as React from 'react';

export interface BoxProps {
	/**
	 * Class name
	 */
	className?: string;
	/**
	 * Box height in pixels
	 */
	height?: number;
	/**
	 * Box width in pixels
	 */
	width?: number;
	/**
	 * Box background color
	 */
	backgroundColor?: string;
}

declare const Box: React.SFC<BoxProps>;

export default Box;
