import * as React from 'react';

export interface ElementsLogoProps {
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
	getStyles?: (...args: any[]) => any;
}

declare const ElementsLogo: React.SFC<ElementsLogoProps>;

export default ElementsLogo;
