import React from 'react';
import renderer from 'react-test-renderer';
import TeachingBubble from './TeachingBubble';

describe('TeachingBubble', () => {
	test('displays `TeachingBubble` as headline', () => {
		const tree = renderer
			.create(<TeachingBubble id="defaultTeachingBubble" headline="TeachingBubble" />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
