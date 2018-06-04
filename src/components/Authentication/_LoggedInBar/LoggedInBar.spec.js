import React from 'react';
import renderer from 'react-test-renderer';
import LoggedInBar from './LoggedInBar';

describe('LoggedInBar', () => {
	test('displays correctly', () => {
		const tree = renderer.create(<LoggedInBar currentUserName="John Doe" tenant="test" />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
