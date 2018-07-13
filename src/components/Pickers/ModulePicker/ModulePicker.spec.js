import * as React from 'react';
import { shallow } from 'enzyme';
import ModulePicker from './index';

describe('ModulePicker', () => {
	test('displays correctly', () => {
		const wrapper = shallow(<ModulePicker id="testModulePicker" />);
		expect(wrapper).toMatchSnapshot();
	});

	test('translates modules correctly', () => {
		const wrapper = shallow(<ModulePicker locale="en" modules={[{ Id: 'rm' }]} />);
		expect(wrapper.html()).toContain('Record management');

		const wrapper2 = shallow(<ModulePicker locale="sv" modules={[{ Id: 'rm' }, { Id: 'mm' }]} />);
		expect(wrapper2.html()).toContain('Mötesmodul');
		expect(wrapper2.html()).toContain('Gränssnitt för handläggare');
	});
});
