import * as React from 'react';
import { shallow } from 'enzyme';
import LanguagePicker from './LanguagePicker';

describe('LanguagePicker', () => {
	test('displays correctly', () => {
		const wrapper = shallow(
			<LanguagePicker
				id="testLanguagePicker"
				languageCodes={['en', 'nb', 'nn', 'sv']}
				defaultLanguage="en"
			/>
		);
		expect(wrapper).toMatchSnapshot();
	});
});
