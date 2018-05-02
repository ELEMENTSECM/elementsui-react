import * as React from 'react';
import PropTypes from 'prop-types';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { getStyles } from './Button.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';

/** Button example */
export function Button(props) {
	const { label, disabled, onClick, isPrimary, className, theme, getStyles } = props;
	const classNames = classNamesFunction()(getStyles, props);
	return (
		<DefaultButton className={classNames.root} disabled={disabled} primary={isPrimary} onClick={onClick}>
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
	isPrimary: PropTypes.bool,
	/** User-defined styling */
	getStyles: PropTypes.func
};

export default styled(customizable('Button', ['theme'])(Button), getStyles);
