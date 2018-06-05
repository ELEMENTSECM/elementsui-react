import * as React from 'react';

export interface BreadcrumbProps {
	/**
	 * Breadcrumb arialabel for navigation landmark
	 */
	ariaLabel?: string;
	/**
	 * Breadcrumb max visible crumbs when availible space
	 */
	maxDisplayedItems?: number;
	/**
	 * The actual crumb elements
	 */
	items?: any[];
	/**
	 * User-defined styling
	 */
	styles?: (...args: any[]) => any;
}

declare const Breadcrumb: React.SFC<BreadcrumbProps>;

export default Breadcrumb;
