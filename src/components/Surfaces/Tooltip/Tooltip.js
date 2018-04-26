import React from 'react';
import PropTypes from 'prop-types';
import { TooltipHost as UIFabTooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { getStyles } from './Tooltip.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';

/**Tooltip example */
export function Tooltip({ content, element, className, theme }) {
	const classNames = classNamesFunction()(getStyles, {
		theme,
		className
	});
	return (
		<div>
			<UIFabTooltipHost className={classNames.root} content={content}>
				{element}
			</UIFabTooltipHost>
		</div>
	);
}

Tooltip.propTypes = {
	/**Tooltip content */
	content: PropTypes.string
};

export default styled(customizable('Tooltip', ['theme'])(Tooltip), getStyles);
