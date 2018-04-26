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
}

export const TeachingBubble: React.SFC<TeachingBubbleProps>;
