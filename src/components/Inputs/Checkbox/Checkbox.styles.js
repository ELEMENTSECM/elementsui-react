export const styles = props => {
	const { className, theme } = props;
	const { palette, semanticColors } = theme;

	return {
		root: [
			'ms-Checkbox',
			{
				// place your styles here
			},
			className
		]
	};
};
