import React from 'react';
import PropTypes from 'prop-types';
import { TooltipHost as UIFabTooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { getStyles } from './Tooltip.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';

/**Tooltip example */
export function Tooltip(props) {
	const { content, className, theme, getStyles } = props;
	const classNames = classNamesFunction()(getStyles, props);
	return (
		<div>
			<UIFabTooltipHost className={classNames.root} content={content}>
				{props.children}
			</UIFabTooltipHost>
		</div>
	);
}

Tooltip.propTypes = {
	/**Tooltip content */
	content: PropTypes.string,
	/** User-defined styling */
	getStyles: PropTypes.func
};

export default styled(customizable('Tooltip', ['theme'])(Tooltip), getStyles);
