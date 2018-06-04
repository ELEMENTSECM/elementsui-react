import * as React from 'react';
import { shallow } from 'enzyme';
import LoginError from './LoginError';

describe('LoginError', () => {
	test('displays correctly', () => {
		const wrapper = shallow(
			<LoginError id="testLoginError" type="noModule">
				Some error text
			</LoginError>
		);
		expect(wrapper).toMatchSnapshot();
	});
});
