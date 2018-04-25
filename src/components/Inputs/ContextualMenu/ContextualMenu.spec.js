import React from 'react';
import renderer from 'react-test-renderer';
import ContextualMenu from './ContextualMenu';

describe('ContextualMenu', () => {
	test('displays `Foo` as text', () => {
		const tree = renderer.create(<ContextualMenu htmlId="contextualMenuButton" text="Foo" />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});

describe('ContextualMenuProps', () => {
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

	test('displays menu correctly', () => {
		const tree = renderer
			.create(<ContextualMenu id="testContextualMenu" text="Contextual Menu" menuProps={{ items }} />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
