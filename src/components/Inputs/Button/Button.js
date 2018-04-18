import * as React from 'react';
import PropTypes from 'prop-types';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

/** Button example */
function Button({ label, disabled = false, onClick, isPrimary }) {
	return (
		<DefaultButton disabled={disabled} primary={isPrimary} onClick={onClick}>
			{label}
		</DefaultButton>
	);
}

Button.propTypes = {
	/** Button label */
	label: PropTypes.string,
	/** Button is disabled */
	disabled: PropTypes.bool,
	/** Mouse click event handler */
	onCLick: PropTypes.func,
	/** Primary button */
	isPrimary: PropTypes.bool
};

export default Button;
