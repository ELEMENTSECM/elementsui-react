import React from 'react';
import PropTypes from 'prop-types';
import { TooltipHost as UIFabTooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { styles } from './Tooltip.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';

/**Tooltip example */
export function Tooltip(props) {
	const { id, content, styles } = props;
	const classNames = classNamesFunction()(styles, props);
	return (
		<div>
			<UIFabTooltipHost id={id} className={classNames.root} content={content}>
				{props.children}
			</UIFabTooltipHost>
		</div>
	);
}

Tooltip.propTypes = {
	/** HTML id tag of the root element */
	id: PropTypes.string,
	/**Tooltip content */
	content: PropTypes.string,
	/** User-defined styling */
	styles: PropTypes.func
};

export default styled(customizable('Tooltip', ['theme'])(Tooltip), styles);
