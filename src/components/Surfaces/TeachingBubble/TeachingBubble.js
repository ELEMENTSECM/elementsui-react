import React from 'react';
import PropTypes from 'prop-types';
import { TeachingBubble as UIFabTeachingBubble } from 'office-ui-fabric-react/lib/TeachingBubble';
import { getStyles } from './TeachingBubble.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';

/** TeachingBubble example */
export function TeachingBubble(props) {
	const {
		headline,
		targetElement,
		dismissed,
		isTeachingBubbleVisible,
		className,
		theme,
		getStyles
	} = props;
	const classNames = classNamesFunction()(getStyles, props);
	return (
		<div>
			<UIFabTeachingBubble
				className={classNames.root}
				headline={headline}
				targetElement={targetElement}
				dismissed={dismissed}
				isTeachingBubbleVisible={isTeachingBubbleVisible}>
				{props.children}
			</UIFabTeachingBubble>
		</div>
	);
}

TeachingBubble.propTypes = {
	/**Teachingbubble Headline */
	headline: PropTypes.string,
	/**Teachingbubble Target */
	targetElement: PropTypes.object,
	/**Teachingbubble Dissmissed */
	dismissed: PropTypes.bool,
	/**isTeachingBubbleVisible */
	isTeachingBubbleVisible: PropTypes.bool,
	/** User-defined styling */
	getStyles: PropTypes.func
};

export default styled(customizable('TeachingBubble', ['theme'])(TeachingBubble), getStyles);
