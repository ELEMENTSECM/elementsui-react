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
    }

    export const Breadcrumb: React.SFC<BreadcrumbProps>;


