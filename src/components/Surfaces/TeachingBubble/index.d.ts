import * as React from 'react';

export interface TeachingBubbleProps {
        /**
         * Teachingbubble Headline
         */
        headline?: string;
        /**
         * Teachingbubble Target
         */
        targetElement?: Object;
        /**
         * Teachingbubble Dissmissed
         */
        dismissed?: boolean;
        /**
         * isTeachingBubbleVisible
         */
        isTeachingBubbleVisible?: boolean;
        /**
         * User-defined styling
         */
        getStyles?: (...args: any[])=>any;
    }

    declare const TeachingBubble: React.SFC<TeachingBubbleProps>;
export default TeachingBubble;