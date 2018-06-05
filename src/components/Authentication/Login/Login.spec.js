import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';

describe('Login', () => {
	test('displays correctly', () => {
		const wrapper = shallow(
			<Login
				appConfig={{
					configServerUrl: 'configServerUrl',
					configServerAuth: 'configServerAuth',
					configServerReq: 'configServerReq',
					idpClient: 'idpClient',
					baseUri: 'baseUri',
					idpRedirectUri: 'idpRedirectUri',
					extSystemName: 'extSystemName'
				}}
				actions={{
					loginAsync: () => {},
					logout: () => {}
				}}
			/>
		);
		expect(wrapper).toMatchSnapshot();
	});
});
