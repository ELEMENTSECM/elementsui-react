import React from 'react';
import renderer from 'react-test-renderer';
import Dropdown from './Dropdown';

describe('Dropdown', () => {
	const options = [
		{
			key: 1,
			text: 'Option 1'
		},
		{
			key: 2,
			text: 'Option 2'
		},
		{
			key: 3,
			text: 'Option 3',
			isSelected: true
		}
	];

	test('displays correctly', () => {
		const tree = renderer
			.create(
				<Dropdown
					htmlId="testDropdown"
					label="test dropdown"
					selectedKey="3"
					placeHolder="Select test..."
					options={options}
				/>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
