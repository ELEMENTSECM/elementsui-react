export const getStyles = props => {
	const { className, theme } = props;
	const { palette, semanticColors } = theme;

	return {
		root: [
			'ms-Label',
			{
				// place your styles here
			},
			className
		]
	};
};
