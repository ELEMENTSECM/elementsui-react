import * as React from 'react';
import { shallow } from 'enzyme';
import ElementsLogo from './ElementsLogo';

describe('ElementsLogo', () => {
	test('displays correctly', () => {
		const wrapper = shallow(<ElementsLogo id="testLogo" color="green" width={200} />);
		expect(wrapper).toMatchSnapshot();
	});
});
