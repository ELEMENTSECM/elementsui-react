import * as React from 'react';
import { shallow } from 'enzyme';
import ModuleIcon from './index';

describe('ModuleIcon', () => {
	test('displays correctly', () => {
		const wrapper = shallow(<ModuleIcon moduleId="rm" color="red" size={200} />);
		expect(wrapper).toMatchSnapshot();
	});
});
