import React from 'react';
import PropTypes from 'prop-types';
import { Panel as UIFabPanelType } from 'office-ui-fabric-react/lib/Panel';

/**Panel example */
function Panel({ headerText, element, onRenderFooterContent }) {
	let showPanel = true;
	return (
		<UIFabPanelType
			isOpen={showPanel}
			type={UIFabPanelType.smallFixedFar}
			onDismiss={() => {}}
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
	onDismiss: PropTypes.func,
	/**Panel header text */
	headerText: PropTypes.string,
	/**Panel closebutton aria label */
	closebuttonAriaLabel: PropTypes.string,
	/**Panel footer content */
	onRenderFooterContent: PropTypes.func
};

export default Panel;
