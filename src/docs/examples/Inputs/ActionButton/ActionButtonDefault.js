import * as React from 'react';
import ActionButton from 'elementsui-react/Inputs/ActionButton';

/** Action button with mouse click handler */
export default function ActionButtonDefault() {
	return (
		<ActionButton
			label="What a wonderful day"
			iconProps={{ iconName: 'sunny' }}
			onClick={() => alert('The sun is shining')}
		/>
	);
}
