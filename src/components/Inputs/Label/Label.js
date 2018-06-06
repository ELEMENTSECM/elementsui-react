import * as React from 'react';
import PropTypes from 'prop-types';
import { Label as UIFabLabel } from 'office-ui-fabric-react/lib/Label';
import { styles } from './Label.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';

/** Label example */
export function Label(props) {
	const { htmlId, label, required, disabled, styles } = props;
	const classNames = classNamesFunction()(styles, props);
	return (
		<UIFabLabel id={htmlId} className={classNames.root} required={required} disabled={disabled}>
			{label}
		</UIFabLabel>
	);
}

Label.propTypes = {
	/** HTML id tag of the root element */
	htmlId: PropTypes.string,
	/**Label required */
	required: PropTypes.bool,
	/** Label disabled */
	disabled: PropTypes.bool,
	/** Label  label*/
	label: PropTypes.string.isRequired,
	/** User-defined styling */
	styles: PropTypes.func
};

export default styled(customizable('Label', ['theme'])(Label), styles);
