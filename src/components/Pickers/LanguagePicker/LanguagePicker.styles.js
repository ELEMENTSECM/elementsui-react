export const styles = props => {
	const { className, theme } = props;
	const { palette, semanticColors } = theme;

	return {
		root: [
			'ms-LanguagePicker ec ec-dropdown languagepicker',
			{
				// ---------------------------------------------------
				// Notes on possible css class implementation:
				// ec:elements common component scope
				// ec-dropdown:because its a dropdown component
				// languagepicker:variant of the dropdown component
				// Order:Component scope | Type | Variant
				// In the Doc variant, additional classes can be added
				// ---------------------------------------------------
				// background: props.theme.palette.themePrimary
				// place your styles here
			},
			className
		]
	};
};
