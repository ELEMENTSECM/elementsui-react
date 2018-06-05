export const styles = props => {
	const { className } = props;

	return {
		root: [
			'ms-Persona',
			{
				// background: props.theme.palette.themePrimary
				// place your styles here
			},
			className
		],
		primaryText: [
			{
				fontWeight: 'bold'
			}
		]
	};
};
