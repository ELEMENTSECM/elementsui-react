export const styles = props => {
	const { className, theme } = props;
	const { palette, semanticColors } = theme;

	return {
		root: [
			'ms-Toggle',
			{
				// place your styles here
			},
			className
		]
	};
};
