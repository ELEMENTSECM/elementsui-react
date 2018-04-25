import * as React from 'react';
import ContextualMenu from 'elementsui-react/Inputs/ContextualMenu';
import { ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';

const items = [
	{
		key: 'newItem',
		name: 'New item',
		onClick: () => console.log('New item clicked')
	},
	{
		key: 'divider_1',
		itemType: ContextualMenuItemType.Divider
	},
	{
		key: 'editItem',
		name: 'Edit item',
		onClick: () => console.log('Edit item clicked')
	},
	{
		key: 'ItemProperties',
		name: 'Item properties',
		onClick: () => console.log('Item properties clicked')
	},
	{
		key: 'divider_2',
		itemType: ContextualMenuItemType.Divider
	},
	{
		key: 'noTarget',
		name: 'Link default',
		href: 'http://evry.com'
	},
	{
		key: 'linkWithBlankTarget',
		name: 'Link new window',
		href: 'http://evry.com',
		target: '_blank'
	},
	{
		key: 'divider_3',
		itemType: ContextualMenuItemType.Divider
	},
	{
		key: 'disabled',
		name: 'Disabled item',
		disabled: true
	}
];
/** Contextual Menu with Primary Button */
export default function ContextualMenuPrimary() {
	return (
		<ContextualMenu
			htmlId="contextualMenu"
			isPrimary={true}
			buttonText="Menu"
			ariaLabel="Context Menu"
			menuProps={{
				items: items,
				shouldFocusOnMount: true
			}}
		/>
	);
}
