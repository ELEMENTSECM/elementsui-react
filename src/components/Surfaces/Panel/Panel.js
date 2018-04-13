import React from 'react';
import PropTypes from 'prop-types';
import { Panel as UIFabPanelType } from 'office-ui-fabric-react/lib/Panel';

/**Panel example */
function Panel({ headerText, element, onRenderFooterContent, isOpen, onDismissed }) {
	return (
		<UIFabPanelType
			isOpen={isOpen}
			type={UIFabPanelType.smallFixedFar}
			onDismissed={onDismissed}
			headerText={headerText}
			closebuttonAriaLabel="Close"
			onRenderFooterContent={onRenderFooterContent}>
			{element}
		</UIFabPanelType>
	);
}

Panel.propTypes = {
	/**Panel open */
	isOpen: PropTypes.bool,
	/**Panel type */
	type: PropTypes.string,
	/**Panel on dismissed */
	onDismissed: PropTypes.bool,
	/**Panel header text */
	headerText: PropTypes.string,
	/**Panel closebutton aria label */
	closebuttonAriaLabel: PropTypes.string,
	/**Panel footer content */
	onRenderFooterContent: PropTypes.func
};

export default Panel;
