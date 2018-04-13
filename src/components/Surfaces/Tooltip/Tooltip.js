import React from 'react';
import PropTypes from 'prop-types';
import { TooltipHost as UIFabTooltipHost } from 'office-ui-fabric-react/lib/Tooltip';

/**Tooltip example */
function Tooltip({ content, element }) {
	return (
		<div>
			<UIFabTooltipHost content={content}>{element}</UIFabTooltipHost>
		</div>
	);
}

Tooltip.propTypes = {
	/**Tooltip content */
	content: PropTypes.string
};

export default Tooltip;
