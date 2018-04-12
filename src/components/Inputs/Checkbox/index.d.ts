import * as React from 'react';

export interface CheckboxProps {
        /**
         * Checkbox label
         */
        label?: string;
        /**
         * Checkbox is disabled
         */
        disabled?: boolean;
        /**
         * Checkbox description
         */
        ariaDescribedBy?: string;
    }

    export const Checkbox: React.SFC<CheckboxProps>;


