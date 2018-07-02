import * as React from 'react';
import { shallow } from 'enzyme';
import AutoHeight from './index';

describe('AutoHeight', () => {
	test('displays correctly', () => {
		const wrapper = shallow(<AutoHeight />);
		expect(wrapper).toMatchSnapshot();
	});
});