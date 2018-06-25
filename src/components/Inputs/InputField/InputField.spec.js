import React from 'react';
import renderer from 'react-test-renderer';
import InputField from './InputField';

describe('InputField', () => {
	test('displays correctly', () => {
		const tree = renderer
			.create(<InputField id="testInputField" label="test field" placeholder="Search..." />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
