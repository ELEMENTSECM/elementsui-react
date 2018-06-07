import React from 'react';
import renderer from 'react-test-renderer';
import ContextualMenu from './ContextualMenu';

const items = [
	{
		key: 'newItem',
		name: 'New item',
		onClick: () => console.log('New item clicked')
	},
	{
		key: 'noTarget',
		name: 'Link default',
		href: 'http://evry.com'
	}
];

describe('ContextualMenuProps', () => {
	test('displays menu correctly', () => {
		const tree = renderer
			.create(
				<ContextualMenu id="testContextualMenu" text="Contextual Menu" menuProps={{ items }} />
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
