import * as React from 'react';

export interface PanelProps {
        /**
         * Panel open
         */
        isOpen?: boolean;
        /**
         * Panel type
         */
        type?: string;
        /**
         * Panel on dismissed
         */
        dismiss?: boolean;
        /**
         * Panel header text
         */
        headerText?: string;
        /**
         * Panel closebutton aria label
         */
        closebuttonAriaLabel?: string;
        /**
         * Panel footer content
         */
        onRenderFooterContent?: (...args: any[])=>any;
    }

    export const Panel: React.SFC<PanelProps>;


