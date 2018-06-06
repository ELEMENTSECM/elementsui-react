import React from 'react';
import renderer from 'react-test-renderer';
import LoggedInBar from './LoggedInBar';
import { IntlProvider } from 'react-intl';
import json from '../Login/Login.nls.json';

describe('LoggedInBar', () => {
	test('displays correctly', () => {
		const tree = renderer
			.create(
				<IntlProvider locale="en" messages={json.en}>
					<LoggedInBar currentUserName="John Doe" tenant="test" />
				</IntlProvider>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
