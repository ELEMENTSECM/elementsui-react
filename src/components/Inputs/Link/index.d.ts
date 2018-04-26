import * as React from 'react';

export interface LinkProps {
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
}

export const Link: React.SFC<LinkProps>;
