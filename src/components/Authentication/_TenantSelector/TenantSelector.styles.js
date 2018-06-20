export const styles = props => {
	const { className } = props;
	const loginDropdowns = {
		display: 'flex',
		selectors: {
			'> div': {
				overflow: 'hidden'
			},
			'> :first-of-type': {
				'flex-basis': '70%'
			},
			'> :last-of-type': {
				'flex-basis': '30%'
			}
		}
	};
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
		dropdown_wrapper: [loginDropdowns],
		dropdown_label_wrapper: [loginDropdowns]
	};
};
