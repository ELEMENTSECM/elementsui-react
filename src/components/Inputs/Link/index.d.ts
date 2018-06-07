import * as React from 'react';

export interface LinkProps {
	/**
	 * HTML id tag of the root element
	 */
	id?: string;
	/**
	 * Link label
	 */
	label?: string;
	/**
	 * Link href
	 */
	href?: string;
	/**
	 * Link disabled
	 */
	disabled?: boolean;
	/**
	 * User-defined styling
	 */
	styles?: (...args: any[]) => any;
}

declare const Link: React.SFC<LinkProps>;

export default Link;
