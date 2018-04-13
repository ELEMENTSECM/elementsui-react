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
        onDismiss?: (...args: any[])=>any;
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
        /**
         * showPanel
         */
        showPanel?: boolean;
    }

    export const Panel: React.SFC<PanelProps>;


