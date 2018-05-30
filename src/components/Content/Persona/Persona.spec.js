import * as React from 'react';
import { shallow } from 'enzyme';
import Persona from './index';

describe('Persona', () => {
	test('displays correctly', () => {
		const wrapper = shallow(<Persona />);
		expect(wrapper).toMatchSnapshot();
	});
});