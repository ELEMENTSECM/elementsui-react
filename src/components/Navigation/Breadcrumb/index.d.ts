import * as React from 'react';

export interface BreadcrumbProps {
        items?: any;
        ariaLabel?: string;
        maxDisplayedItems?: number;
    }

    export const Breadcrumb: React.SFC<BreadcrumbProps>;


