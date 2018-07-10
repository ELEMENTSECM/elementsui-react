export const styles = props => {
	const { className, theme } = props;
	const { palette, semanticColors } = theme;

	return {
		root: [
			'ms-ElementsLogo',
			{
				// background: props.theme.palette.themePrimary
				// place your styles here
				maxHeight: '36px'
			},
			className
		]
	};
};
