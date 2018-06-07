import * as React from 'react';

export interface BoxProps {
	/**
	 * HTML id tag of the root element
	 */
	id?: string;
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
