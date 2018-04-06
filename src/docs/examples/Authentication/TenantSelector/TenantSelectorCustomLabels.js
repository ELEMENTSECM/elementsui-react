import * as React from 'react';
import TenantSelector from 'elementsui-react/Authentication/TenantSelector';

/** Tenant selector: custom labels */
export default function TenantSelectorDefault() {
	return (
		<TenantSelector
			tenants={tenants}
			handleLoginClick={() => alert('Log in clicked')}
			onChange={t => alert(`${t._id} is selected`)}
			isLoggedIn={false}
			labels={{
				login: 'Sign in',
				logout: 'Sign out',
				selectTenant: 'Select database',
				loggedInAs: 'You are logged in as'
			}}
		/>
	);
}

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
