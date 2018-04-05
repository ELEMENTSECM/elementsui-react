import React from 'react';
import renderer from 'react-test-renderer';
import TenantSelector from './TenantSelector';

describe('TenantSelector', () => {
	const tenants = [
		{
			_id: 'DATABASE 1',
			_childId: 'CHILD_ID_1',
			_scope: 'SCOPE_1',
			elements: {
				Authentication_BaseUrl: 'https://authurl.com',
				Authentication_DefaultProvider: 'MiniWindowsIdp'
			},
			ncoreclient: {
				BaseUrl: 'https://ncorebaseUrl.com'
			}
		},
		{
			_id: 'DATABASE 2',
			_childId: 'CHILD_ID_2',
			_scope: 'SCOPE_1',
			elements: {
				Authentication_BaseUrl: 'https://authurl.com',
				Authentication_DefaultProvider: 'MiniWindowsIdp'
			},
			ncoreclient: {
				BaseUrl: 'https://ncorebaseUrl.com'
			}
		}
	];

	const labels = {
		login: 'Sign in',
		logout: 'Sign out',
		selectTenant: 'Select database',
		loggedInAs: 'You are logged in as'
	};

	test('displays tenants and labels correctly', () => {
		const tree = renderer.create(<TenantSelector tenants={tenants} labels={labels} />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	test('displays when logged in correctly', () => {
		const tree = renderer
			.create(<TenantSelector tenants={tenants} labels={labels} isLoggedIn={true} />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
