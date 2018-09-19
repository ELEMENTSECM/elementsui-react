List item
```js
	<ul>
			{[
		{
			title: 'Notification',
			icon: 'glyphicon glyphicon-large glyphicon-bell',
			iconColor: '#3d9c97'
		},
		{
			title: 'Case',
			icon: 'glyphicon glyphicon-large glyphicon-folder-close',
			iconColor: '#428bca'
		},
		{
			title: 'Registry Entry',
			icon: 'glyphicon glyphicon-large glyphicon-envelope',
			iconColor: '#ffad5b'
		}
	].map((x, i) => (
				<ListItem key={i} icon={x.icon} iconColor={x.iconColor} onClick={() => alert(`List item ${x.title} selected`)}>
					{x.title}
				</ListItem>
			))}
	</ul>

```
