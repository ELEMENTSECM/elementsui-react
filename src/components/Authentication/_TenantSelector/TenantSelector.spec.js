import React from 'react';
import renderer from 'react-test-renderer';
import TenantSelector from './TenantSelector';
import { IntlProvider } from 'react-intl';
import json from '../Login/Login.nls.json';

describe('TenantSelector', () => {
	const tenants = [{ Id: 'ID_1', Description: 'ID_1_DESC' }];

	test('displays tenants and labels correctly', () => {
		const tree = renderer
			.create(
				<IntlProvider locale="en" messages={json.en}>
					<TenantSelector tenants={tenants} selectedTenant="ID_1" currentUserName="John Doe" />
				</IntlProvider>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test('displays when logged in correctly', () => {
		const tree = renderer
			.create(
				<IntlProvider locale="en" messages={json.en}>
					<TenantSelector
						tenants={tenants}
						isLoggedIn={true}
						selectedTenant="ID_1"
						currentUserName="John Doe"
					/>
				</IntlProvider>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
