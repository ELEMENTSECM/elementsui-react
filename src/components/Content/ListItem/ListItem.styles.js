export const styles = props => {
	const { className } = props;

	return {
		root: [
			'ListItem',
			{
				overflow: 'hidden',
				marginBottom: -1,
				position: 'relative',
				selectors: {
					':nth-child(odd)': {
						background: '#f7f7f7'
					}
				}
			},
			className
		],
		link: [
			{
				fontSize: '1.2em',
				minHeight: 49,
				padding: '15px 20px 4px 37px',
				marginLeft: 17,
				borderRadius: 0,
				borderWidth: 0,
				color: '#555',
				display: 'block'
			}
		],
		icon: [
			{
				marginLeft: -13
			}
		],
		row: ['row'],
		iconCol: ['col-xs-1'],
		textCol: ['col-xs-10']
	};
};
