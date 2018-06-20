import * as React from 'react';
import ListItem from 'elementsui-react/Content/ListItem';

/** List item */
export default function ListItemDefault() {
	const items = [
		{
			title: 'Notification',
			styles: () => ({
				icon: [
					'glyphicon-large',
					'glyphicon',
					'glyphicon-bell',
					{
						color: '#3d9c97'
					}
				]
			})
		},
		{
			title: 'Case',
			styles: () => ({
				icon: [
					'glyphicon-large',
					'glyphicon',
					'glyphicon-folder-close',
					{
						color: '#428bca'
					}
				]
			})
		},
		{
			title: 'Registry Entry',
			styles: () => ({
				icon: [
					'glyphicon-large',
					'glyphicon',
					'glyphicon-envelope',
					{
						color: '#ffad5b'
					}
				]
			})
		}
	];
	return (
		<div>
			{items.map((x, i) => (
				<ListItem key={i} styles={x.styles} onClick={() => alert(`List item ${x.title} selected`)}>
					{x.title}
				</ListItem>
			))}
		</div>
	);
}
