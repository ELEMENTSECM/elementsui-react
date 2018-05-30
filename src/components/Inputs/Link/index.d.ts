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
        /**
         * User-defined styling
         */
        getStyles?: (...args: any[])=>any;
    }

    declare const Link: React.SFC<LinkProps>;
export default Link;