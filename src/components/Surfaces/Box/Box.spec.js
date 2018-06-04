import * as React from 'react';
import { shallow } from 'enzyme';
import Box from './index';

describe('Box', () => {
	test('displays correctly', () => {
		const wrapper = shallow(<Box />);
		expect(wrapper).toMatchSnapshot();
	});
});