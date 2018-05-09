import * as React from 'react';
import CommandBar from 'elementsui-react/Inputs/CommandBar';

const leftSideCommandBarButtons = [
	{
		key: 'newItem',
		name: 'New',
		icon: 'Add',
		ariaLabel: 'New. Use left and right arrow keys to navigate',
		items: [
			{
				key: 'emailMessage',
				name: 'Email message',
				icon: 'Mail'
			},
			{
				key: 'calendarEvent',
				name: 'Calendar event',
				icon: 'Calendar'
			}
		]
	},
	{
		key: 'upload',
		name: 'Upload',
		icon: 'Upload',
		onClick: () => {
			alert('Clicked!');
		}
	}
];

const rightSideCommandBarButtons = [
	{
		key: 'saveStatus',
		name: 'Your page has been saved',
		icon: 'CheckMark'
	},
	{
		key: 'publish',
		name: 'Publish',
		icon: 'ReadingMode',
		onClick: () => {
			alert('Clicked!');
		}
	}
];

/** Basic CommandBar menu with some left side and some right side items */
export default function CommandBarPrimary() {
	return <CommandBar items={leftSideCommandBarButtons} farItems={rightSideCommandBarButtons} />;
}
