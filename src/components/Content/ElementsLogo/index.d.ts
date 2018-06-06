import * as React from 'react';

export interface ElementsLogoProps {
	/**
	 * HTML id tag of the root element
	 */
	htmlId?: string;
	/**
	 * Logo color
	 */
	color?: string;
	/**
	 * Logo width
	 */
	width?: number;
	/**
	 * User-defined styling
	 */
	styles?: (...args: any[]) => any;
}

declare const ElementsLogo: React.SFC<ElementsLogoProps>;

export default ElementsLogo;
