import * as React from 'react';
import Button from 'elementsui-react/Inputs/Button';

/** Styled button: the styles defined in styles prop will be merged with the existing ones */
export default function ButtonStyled() {
	const styles = props => {
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
		<Button id="defaultBtn" isPrimary={true} className="button-primary" styles={styles}>
			Styled button
		</Button>
	);
}
