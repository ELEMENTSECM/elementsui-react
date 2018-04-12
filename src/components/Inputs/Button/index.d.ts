import * as React from 'react';

export interface ButtonProps {
        /**
         * Button label
         */
        label?: string;
        /**
         * Button is disabled
         */
        disabled?: boolean;
        /**
         * Mouse click event handler
         */
        onCLick?: (...args: any[])=>any;
    }

    export const Button: React.SFC<ButtonProps>;


