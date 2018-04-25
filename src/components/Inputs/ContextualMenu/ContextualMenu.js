import * as React from 'react';
import PropTypes from 'prop-types';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

/** Contextual Menu Button */
function ContextualMenu({ isPrimary, ariaLabel, buttonText, menuProps }) {
	return (
		<DefaultButton primary={isPrimary} ariaLabel={ariaLabel} text={buttonText} menuProps={menuProps} />
	);
}

ContextualMenu.propTypes = {
	/** ContextualMenu primary  */
	isPrimary: PropTypes.bool,
	/** ContextualMenu button text */
	buttonText: PropTypes.string,
	/** ContextualMenu button ariaLabel */
	ariaLabel: PropTypes.string,
	/**  ContextualMenu menuitems */
	menuProps: PropTypes.shape({
		items: PropTypes.array
	}).isRequired
};

export default ContextualMenu;
