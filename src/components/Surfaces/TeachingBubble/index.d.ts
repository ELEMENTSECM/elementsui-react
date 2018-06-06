import * as React from 'react';

export interface TeachingBubbleProps {
	/**
	 * HTML id tag of the root element
	 */
	htmlId?: string;
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
	styles?: (...args: any[]) => any;
}

declare const TeachingBubble: React.SFC<TeachingBubbleProps>;

export default TeachingBubble;
