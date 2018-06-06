import React from 'react';
import renderer from 'react-test-renderer';
import CommandBar from './CommandBar';

describe('CommandBar', () => {
	test('displays `Foo` as text', () => {
		const leftSideCommandBarButtons = [
			{
				key: 'upload',
				name: 'Upload',
				icon: 'Upload',
				onClick: () => {
					alert('Clicked!');
				}
			}
		];
		const tree = renderer
			.create(<CommandBar id="testCommandBar" items={leftSideCommandBarButtons} />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
