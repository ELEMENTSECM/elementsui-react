import * as React from 'react';
import PropTypes from 'prop-types';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { styles } from './Button.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';

/** Button example */
export function Button(props) {
	const { id, label, disabled, onClick, isPrimary, styles, children } = props;
	const classNames = classNamesFunction()(styles, props);
	return (
		<DefaultButton
			id={id}
			className={classNames.root}
			disabled={disabled}
			primary={isPrimary}
			onClick={onClick}>
			{label || children}
		</DefaultButton>
	);
}

Button.propTypes = {
	/** HTML id tag of the root element */
	id: PropTypes.string,
	/** Button label (children are ignored if label is defined)  */
	label: PropTypes.string,
	/** Button children */
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
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
