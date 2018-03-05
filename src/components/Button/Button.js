import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import PropTypes from 'prop-types';

/** Button example */
function Button({ htmlId, label, disabled = false }) {
	return (
		<DefaultButton disabled={disabled} primary={true}>
			{label}
		</DefaultButton>
	);
}

Button.propTypes = {
	/** Unique HTML ID. Used for tying label to HTML input. Handy hook for automated testing. */
	htmlId: PropTypes.string.isRequired,
	/** Button label */
	label: PropTypes.string,
	/** Button is disabled */
	disabled: PropTypes.bool
};

export default Button;
