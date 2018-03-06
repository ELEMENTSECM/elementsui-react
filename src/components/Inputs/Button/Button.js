import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import PropTypes from 'prop-types';

/** Button example */
function Button({ label, disabled = false }) {
	return (
		<DefaultButton disabled={disabled} primary={true}>
			{label}
		</DefaultButton>
	);
}

Button.propTypes = {
	/** Button label */
	label: PropTypes.string,
	/** Button is disabled */
	disabled: PropTypes.bool
};

export default Button;
