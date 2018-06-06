import React from 'react';
import PropTypes from 'prop-types';
import { TeachingBubble as UIFabTeachingBubble } from 'office-ui-fabric-react/lib/TeachingBubble';
import { styles } from './TeachingBubble.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';

/** TeachingBubble example */
export function TeachingBubble(props) {
	const { id, headline, targetElement, dismissed, isTeachingBubbleVisible, styles } = props;
	const classNames = classNamesFunction()(styles, props);
	return (
		<div>
			<UIFabTeachingBubble
				id={id}
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
	/** HTML id tag of the root element */
	id: PropTypes.string,
	/**Teachingbubble Headline */
	headline: PropTypes.string,
	/**Teachingbubble Target */
	targetElement: PropTypes.object,
	/**Teachingbubble Dissmissed */
	dismissed: PropTypes.bool,
	/**isTeachingBubbleVisible */
	isTeachingBubbleVisible: PropTypes.bool,
	/** User-defined styling */
	styles: PropTypes.func
};

export default styled(customizable('TeachingBubble', ['theme'])(TeachingBubble), styles);
