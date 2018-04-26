export const getStyles = props => {
	const { className, theme } = props;
	const { palette, semanticColors } = theme;

	return {
		root: [
			'ms-Dropdown',
			{
				// place your styles here
			},
			className
		]
	};
};
