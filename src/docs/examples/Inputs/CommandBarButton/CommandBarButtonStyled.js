import * as React from 'react';
import CommandBarButton from 'elementsui-react/Inputs/CommandBarButton';

/** Styled CommandBarButton: the styles defined in getStyles prop will be merged with the existing ones */
export default function ButtonStyled() {
	const getStyles = props => {
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

	return <CommandBarButton text="Styled button" getStyles={getStyles} iconName="Highlight" />;
}
