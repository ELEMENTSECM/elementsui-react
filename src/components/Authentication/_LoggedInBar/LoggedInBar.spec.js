import React from 'react';
import renderer from 'react-test-renderer';
import LoggedInBar from './LoggedInBar';
import { IntlProvider } from 'react-intl';
import json from '../Login/Login.nls.json';

describe('LoggedInBar', () => {
	test('displays correctly', () => {
		const tree = renderer
			.create(
				<div>
					<IntlProvider locale="en" messages={json.en}>
						<LoggedInBar currentUserName="Test user" tenant="test" />
					</IntlProvider>
				</div>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
