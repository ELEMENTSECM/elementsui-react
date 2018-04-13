import React from 'react';
import PropTypes from 'prop-types';
import { Panel as UIFabPanel } from 'office-ui-fabric-react/lib/Panel';

/**Panel example */
function Panel({
	headerText,
	element,
	onRenderFooterContent,
	isOpen,
	onDismissed,
	hasCloseButton,
	closebuttonAriaLabel
}) {
	return (
		<UIFabPanel
			headerText={headerText}
			isOpen={isOpen}
			onDismissed={onDismissed}
			hasCloseButton={hasCloseButton}
			closebuttonAriaLabel={closebuttonAriaLabel}
			onRenderFooterContent={onRenderFooterContent}>
			{element}
		</UIFabPanel>
	);
}

Panel.propTypes = {
	/**Panel open */
	isOpen: PropTypes.bool,
	/**Panel on dismissed */
	onDismissed: PropTypes.func,
	/**Panel header text */
	headerText: PropTypes.string,
	/**Panel closebutton aria label */
	closebuttonAriaLabel: PropTypes.string,
	/**Panel footer content */
	onRenderFooterContent: PropTypes.func,
	/**Panel hasCloseButton */
	hasCloseButton: PropTypes.bool
};

export default Panel;
