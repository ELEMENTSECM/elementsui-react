export const styles = props => {
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
