import * as React from 'react';
import { shallow } from 'enzyme';
import Popup from './index';

describe('Popup', () => {
	test('displays correctly', () => {
		const wrapper = shallow(
			<Popup >
				<span>popup content</span>
			</Popup>
		);
		expect(wrapper).toMatchSnapshot();
	});
});
