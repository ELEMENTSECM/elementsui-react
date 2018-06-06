import * as React from 'react';
import { shallow } from 'enzyme';
import ActionButton from './index';

describe('ActionButton', () => {
	test('displays correctly', () => {
		const wrapper = shallow(<ActionButton />);
		expect(wrapper).toMatchSnapshot();
	});
});