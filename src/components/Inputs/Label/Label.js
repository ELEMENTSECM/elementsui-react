import * as React from 'react';
import PropTypes from 'prop-types';
import { Label as UIFabLabel } from 'office-ui-fabric-react/lib/Label';

/** Label example */
function Label({ label, required, disabled }) {
	return (
		<UIFabLabel required={required} disabled={disabled}>
			{label}
		</UIFabLabel>
	);
}

Label.propTypes = {
	/**Label required */
	required: PropTypes.bool,
	/** Label disabled */
	disabled: PropTypes.bool,
	/** Label  label*/
	label: PropTypes.string.isRequired
};

export default Label;
