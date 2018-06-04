export const getStyles = props => {
	const { className, primaryTextColor, secondaryTextColor, tertiaryTextColor, optionalTextColor } = props;

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
				color: primaryTextColor,
				fontWeight: 'bold',
				selectors: {
					':hover': {
						color: primaryTextColor
					}
				}
			}
		],
		secondaryText: [
			{
				color: secondaryTextColor
			}
		],
		tertiaryText: [
			{
				color: tertiaryTextColor
			}
		],
		optionalText: [
			{
				color: optionalTextColor
			}
		]
	};
};
