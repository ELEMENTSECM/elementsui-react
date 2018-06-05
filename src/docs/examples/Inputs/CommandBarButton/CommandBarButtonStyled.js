import * as React from 'react';
import CommandBarButton from 'elementsui-react/Inputs/CommandBarButton';

/** Styled CommandBarButton: the styles defined in styles prop will be merged with the existing ones */
export default function ButtonStyled() {
	const styles = props => {
		const { className, theme } = props;
		const { palette, semanticColors } = theme;

		return {
			root: [
				{
					background: semanticColors.warningHighlight,
					color: palette.themeDark,
					fontStyle: 'italic'
				},
				className
			]
		};
	};

	return <CommandBarButton text="Styled button" styles={styles} iconName="Highlight" />;
}
