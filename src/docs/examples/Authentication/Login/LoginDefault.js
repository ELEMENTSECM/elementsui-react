import Login from 'elementsui-react/Authentication/Login';
import * as React from 'react';

/** Login */
export default function LoginDefault() {
	const modules = [
		{
			Id: 'rm',
			Name: 'Record Management',
			LicenseName: 'CaseManagement'
		},
		{
			Id: 'mm',
			Name: 'Meeting Module',
			LicenseName: 'MeetingManagement'
		},

		{
			Id: 'sa',
			Name: 'System administration',
			LicenseName: 'SystemAdministration'
		},
		{
			Id: 'eb',
			Name: 'eBuildingCase',
			LicenseName: 'eConstructionmanagement'
		}
	];
	const tenants = [{ Id: 'GECKO-EPHORTE-V6_SQL_EPH_V6_U', Description: 'ELEMENTS UTVIKLING (SQL)' }];
	const props = {
		locale: 'nb',
		modules,
		tenants,
		paths: {
			applicationPath: 'http://127.0.0.1:5000',
			baseUrl: 'http://localhost:3000/Login'
		},
		actions: {
			loginAsync: () => console.log('login async'),
			logout: () => console.log('logout')
		}
	};
	return <Login {...props} />;
}
