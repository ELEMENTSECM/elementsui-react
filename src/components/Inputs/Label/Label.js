import * as React from 'react';
import PropTypes from 'prop-types';
import { Label as UIFabLabel } from 'office-ui-fabric-react/lib/Label';
import { styles } from './Label.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';

/** Label example */
export function Label(props) {
	const { id, label, required, disabled, styles, children } = props;
	const classNames = classNamesFunction()(styles, props);
	return (
		<UIFabLabel id={id} className={classNames.root} required={required} disabled={disabled}>
			{label || children}
		</UIFabLabel>
	);
}

Label.propTypes = {
	/** HTML id tag of the root element */
	id: PropTypes.string,
	/** Label text (children are ignored if label is defined)  */
	label: PropTypes.string,
	/** Label children */
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
	/**Label required */
	required: PropTypes.bool,
	/** Label disabled */
	disabled: PropTypes.bool,
	/** User-defined styling */
	styles: PropTypes.func
};

export default styled(customizable('Label', ['theme'])(Label), styles);
