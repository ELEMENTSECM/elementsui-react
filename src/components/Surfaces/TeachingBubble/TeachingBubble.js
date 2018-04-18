import React from 'react';
import PropTypes from 'prop-types';
import { TeachingBubble as UIFabTeachingBubble } from 'office-ui-fabric-react/lib/TeachingBubble';

/** TeachingBubble example */
function TeachingBubble({ headline, targetElement, dismissed, isTeachingBubbleVisible, element }) {
	return (
		<div>
			<UIFabTeachingBubble
				headline={headline}
				targetElement={targetElement}
				dismissed={dismissed}
				isTeachingBubbleVisible={isTeachingBubbleVisible}>
				{element}
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
	isTeachingBubbleVisible: PropTypes.bool
};

export default TeachingBubble;
