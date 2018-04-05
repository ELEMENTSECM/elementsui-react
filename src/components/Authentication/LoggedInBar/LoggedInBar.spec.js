import React from 'react';
import renderer from 'react-test-renderer';
import LoggedInBar from './LoggedInBar';

describe('LoggedInBar', () => {
	test('displays correctly', () => {
		const tree = renderer
			.create(
				<LoggedInBar name="John Doe" labels={{ logout: 'Sign out', loggedInAs: 'Logged in as' }} />
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
