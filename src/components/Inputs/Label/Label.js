import * as React from 'react';
import PropTypes from 'prop-types';
import { Label as UIFabLabel } from 'office-ui-fabric-react/lib/Label';
import { getStyles } from './Label.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';

/** Label example */
export function Label({ label, required, disabled, className, theme }) {
	const classNames = classNamesFunction()(getStyles, {
		theme,
		className
	});
	return (
		<UIFabLabel className={classNames.root} required={required} disabled={disabled}>
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

export default styled(customizable('Label', ['theme'])(Label), getStyles);
