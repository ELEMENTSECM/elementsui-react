import * as React from 'react';
import { shallow } from 'enzyme';
import ModulePicker from './index';

describe('ModulePicker', () => {
	test('displays correctly', () => {
		const wrapper = shallow(<ModulePicker htmlId="testModulePicker" />);
		expect(wrapper).toMatchSnapshot();
	});
});
