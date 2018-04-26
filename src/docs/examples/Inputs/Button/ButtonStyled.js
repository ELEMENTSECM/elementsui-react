import * as React from 'react';
import Button from 'elementsui-react/Inputs/Button';

/** Styled button: the styles defined in getStyles prop will be merged with the existing ones */
export default function ButtonStyled() {
	const getStyles = props => {
		const { className, theme, isPrimary } = props;
		const { palette, semanticColors } = theme;

		return {
			root: [
				{
					background: semanticColors.warningHighlight,
					color: palette.themeDark,
					fontStyle: isPrimary ? 'bold' : 'italic'
				},
				className
			]
		};
	};

	return (
		<Button
			htmlId="defaultBtn"
			label="Default button"
			isPrimary={true}
			className="button-primary"
			getStyles={getStyles}
		/>
	);
}
