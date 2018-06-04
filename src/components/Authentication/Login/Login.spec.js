import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';

describe('Login', () => {
	test('displays correctly', () => {
		const modules = [
			{
				Id: 'rm',
				Name: 'Record Management'
			},
			{
				Id: 'mm',
				Name: 'Meeting Module'
			},

			{
				Id: 'sa',
				Name: 'System administration'
			},
			{
				Id: 'eb',
				Name: 'eBuildingCase'
			}
		];
		const tenants = [{ Id: 'GECKO-EPHORTE-V6_SQL_EPH_V6_U', Description: 'ELEMENTS UTVIKLING (SQL)' }];
		const props = {
			locale: 'en',
			modules,
			tenants,
			paths: {
				applicationPath: 'http://127.0.0.1:5000',
				baseUrl: 'http://127.0.0.1:5000'
			},
			actions: {
				loginAsync: () => console.log('login async'),
				logout: () => console.log('logout')
			}
		};
		const wrapper = shallow(<Login {...props} />);
		expect(wrapper).toMatchSnapshot();
	});
});
