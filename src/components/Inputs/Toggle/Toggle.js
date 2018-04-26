import * as React from 'react';
import PropTypes from 'prop-types';
import { Toggle as UIFabToggle } from 'office-ui-fabric-react/lib/Toggle';
import { getStyles } from './Toggle.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';

/** Toggle example */
export function Toggle(props) {
	const { label, className, theme, getStyles, disabled = false } = props;
	const classNames = classNamesFunction()(getStyles, props);
	return (
		<UIFabToggle
			className={classNames.root}
			label={label}
			disabled={disabled}
			ariaDescribedBy={'descriptionID'}
			defaultChecked="false"
		/>
	);
}

Toggle.propTypes = {
	/** Toggle label */
	label: PropTypes.string,
	/** Toggle is disabled */
	disabled: PropTypes.bool,
	/** Toggle description */
	ariaDescribedBy: PropTypes.string,
	/** Toggle checked */
	defaultChecked: PropTypes.bool
};

export default styled(customizable('Toggle', ['theme'])(Toggle), getStyles);
