import * as React from 'react';
import ContextualMenu from 'elementsui-react/Inputs/ContextualMenu';
const itemsWithIconsAndSubItems = [
	{
		key: 'newItem',
		name: 'New',
		title: 'Point to open submenu',
		iconProps: {
			iconName: 'Add'
		},
		subMenuProps: {
			items: [
				{
					key: 'emailMessage',
					name: 'Email message',
					title: 'Create an email',
					iconProps: {
						iconName: 'Mail'
					}
				},
				{
					key: 'calendarEvent',
					name: 'Calendar event',
					title: 'Create a calendar event',
					iconProps: {
						iconName: 'Calendar'
					}
				},
				{
					key: 'wordDoc',
					name: 'Word Document',
					title: 'Create',
					iconProps: {
						iconName: 'WordDocument'
					}
				},
				{
					key: 'excelDoc',
					name: 'Excel Document',
					title: 'Create',
					iconProps: {
						iconName: 'ExcelDocument'
					}
				}
			]
		}
	},
	{
		key: 'share',
		name: 'Share',
		title: 'Point to open submenu',
		iconProps: {
			iconName: 'Share'
		},
		subMenuProps: {
			items: [
				{
					key: 'sharetotwitter',
					name: 'Share to Twitter',
					iconProps: {
						iconName: 'Share'
					}
				},
				{
					key: 'sharetofacebook',
					name: 'Share to Facebook',
					iconProps: {
						iconName: 'Share'
					}
				},
				{
					key: 'sharetoemail',
					name: 'Share to Email',
					title: 'Point to open submenu',
					iconProps: {
						iconName: 'Mail'
					},
					subMenuProps: {
						items: [
							{
								key: 'sharetooutlook_1',
								name: 'Share to Outlook',
								title: 'Share to Outlook',
								iconProps: {
									iconName: 'OutlookLogo'
								}
							},
							{
								key: 'sharetogmail_1',
								name: 'Share to Gmail',
								title: 'Share to Gmail',
								iconProps: {
									iconName: 'Mail'
								}
							}
						]
					}
				}
			]
		}
	},
	{
		key: 'shareSplit',
		name: 'Share w/ Split',
		title: 'Point right side [>] to open submenu',
		split: true,
		iconProps: {
			iconName: 'SplitObject'
		},

		subMenuProps: {
			items: [
				{
					key: 'sharetotwittersplit',
					name: 'Share to Twitter',
					iconProps: {
						iconName: 'Share'
					}
				},
				{
					key: 'sharetofacebooksplit',
					name: 'Share to Facebook',
					iconProps: {
						iconName: 'Share'
					}
				},
				{
					key: 'sharetoemailsplit',
					name: 'Share to Email',
					title: 'Point to open submenu',
					iconProps: {
						iconName: 'Mail'
					},
					subMenuProps: {
						items: [
							{
								key: 'sharetooutlooksplit_1',
								name: 'Share to Outlook',
								title: 'Share to Outlook',
								iconProps: {
									iconName: 'OutlookLogo'
								}
							},
							{
								key: 'sharetogmailsplit_1',
								name: 'Share to Gmail',
								title: 'Share to Gmail',
								iconProps: {
									iconName: 'Mail'
								}
							}
						]
					}
				}
			]
		}
	}
];
/** Contextual Menu with icons */
export default function ContextualMenuWithIcons() {
	return (
		<ContextualMenu
			id="contextualMenuWithIcons"
			isPrimary={false}
			buttonText="Menu with icons"
			ariaLabel="Context menu with icons"
			menuProps={{
				items: itemsWithIconsAndSubItems,
				shouldFocusOnMount: true
			}}
			menuIconProps={{ iconName: 'Mail' }}
		/>
	);
}
