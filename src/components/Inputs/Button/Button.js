import * as React from 'react';
import PropTypes from 'prop-types';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { styles } from './Button.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';

/** Button example */
export function Button(props) {
	const { htmlId, label, disabled, onClick, isPrimary, styles } = props;
	const classNames = classNamesFunction()(styles, props);
	return (
		<DefaultButton
			id={htmlId}
			className={classNames.root}
			disabled={disabled}
			primary={isPrimary}
			onClick={onClick}>
			{label}
		</DefaultButton>
	);
}

Button.propTypes = {
	/** HTML id tag of the root element */
	htmlId: PropTypes.string,
	/** Button label */
	label: PropTypes.string,
	/** Button is disabled */
	disabled: PropTypes.bool,
	/** Mouse click event handler */
	onClick: PropTypes.func,
	/** Primary button */
	isPrimary: PropTypes.bool,
	/** User-defined styling */
	styles: PropTypes.func
};

export default styled(customizable('Button', ['theme'])(Button), styles);
