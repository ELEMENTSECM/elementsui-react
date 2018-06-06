import * as React from 'react';
import { shallow } from 'enzyme';
import MessageBar from './index';

describe('MessageBar', () => {
	test('displays correctly', () => {
		const wrapper = shallow(<MessageBar id="testMessageBar" />);
		expect(wrapper).toMatchSnapshot();
	});
});
