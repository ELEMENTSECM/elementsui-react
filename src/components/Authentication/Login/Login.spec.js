import React from 'react'
import { shallow } from 'enzyme'
import Login from './index'

describe('Login', () => {
	test('displays correctly', () => {
		const wrapper = shallow(<Login />);
		expect(wrapper).toMatchSnapshot();
	});
});