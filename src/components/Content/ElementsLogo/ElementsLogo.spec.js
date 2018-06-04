import * as React from 'react';
import { shallow } from 'enzyme';
import ElementsLogo from './index';

describe('ElementsLogo', () => {
	test('displays correctly', () => {
		const wrapper = shallow(<ElementsLogo />);
		expect(wrapper).toMatchSnapshot();
	});
});