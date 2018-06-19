export const styles = props => {
	const { className } = props;

	return {
		label: [
			{
				color: '#fff',
				textTransform: 'uppercase',
				fontSize: '.9em',
				fontWeight: 400
			},
			className
		],
		dropdownWrapper: [
			{
				selectors: {
					':nth-child(last)': {
						background: 'red !important'
					}
				}
			}
		]
	};
};
