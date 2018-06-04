import * as React from 'react';
import { shallow } from 'enzyme';
import BackgroundLoginFrame from './index';

describe('BackgroundLoginFrame', () => {
	test('displays correctly', () => {
		const wrapper = shallow(<BackgroundLoginFrame source="http://localhost" />);
		expect(wrapper).toMatchSnapshot();
	});
});
