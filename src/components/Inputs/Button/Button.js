import * as React from 'react';
import PropTypes from 'prop-types';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

/** Button example */
function Button({ label, disabled = false, onClick }) {
	return (
		<DefaultButton disabled={disabled} primary={true} onClick={onClick} ariaDescription={"Aria description"}>
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
	/** Aria description for SR */
	ariaDescription: PropTypes.string
};

export default Button;
