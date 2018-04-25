import * as React from 'react';
import ContextualMenu from 'elementsui-react/Inputs/ContextualMenu';

const itemsWithSubItems = [
	{
		key: 'newItem',
		subMenuProps: {
			items: [
				{
					key: 'emailMessage',
					name: 'Email message',
					title: 'Create an email'
				},
				{
					key: 'calendarEvent',
					name: 'Calendar event',
					title: 'Create a calendar event'
				}
			]
		},
		href: 'https://bing.com',
		name: 'New'
	},
	{
		key: 'share',
		subMenuProps: {
			items: [
				{
					key: 'sharetotwitter',
					name: 'Share to Twitter'
				},
				{
					key: 'sharetofacebook',
					name: 'Share to Facebook'
				},
				{
					key: 'sharetoemail',
					name: 'Share to Email',
					subMenuProps: {
						items: [
							{
								key: 'sharetooutlook_1',
								name: 'Share to Outlook',
								title: 'Share to Outlook'
							},
							{
								key: 'sharetogmail_1',
								name: 'Share to Gmail',
								title: 'Share to Gmail'
							}
						]
					}
				}
			]
		},
		name: 'Share'
	},
	{
		key: 'shareSplit',
		onClick: () => alert('Split buttons!'),
		split: true,
		subMenuProps: {
			items: [
				{
					key: 'sharetotwittersplit',
					name: 'Share to Twitter'
				},
				{
					key: 'sharetofacebooksplit',
					name: 'Share to Facebook'
				},
				{
					key: 'sharetoemailsplit',
					name: 'Share to Email',
					subMenuProps: {
						items: [
							{
								key: 'sharetooutlooksplit_1',
								name: 'Share to Outlook',
								title: 'Share to Outlook'
							},
							{
								key: 'sharetogmailsplit_1',
								name: 'Share to Gmail',
								title: 'Share to Gmail'
							}
						]
					}
				}
			]
		},
		name: 'Share w/ Split'
	}
];
/** Contextual Menu with sub menus */
export default function ContextualMenuWithSubMenus() {
	return (
		<ContextualMenu
			htmlId="contextualMenuWithSubMenus"
			isPrimary={false}
			buttonText="Menu with sub menus"
			ariaLabel="Context menu with sub menus"
			menuProps={{
				items: itemsWithSubItems,
				shouldFocusOnMount: true
			}}
		/>
	);
}
