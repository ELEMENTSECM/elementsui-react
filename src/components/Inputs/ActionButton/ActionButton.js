import * as React from 'react';
import PropTypes from 'prop-types';
import { ActionButton as UiFabActionButton } from 'office-ui-fabric-react/lib/Button';
import { styles } from './ActionButton.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';

export function ActionButton(props) {
	const { label, iconProps, onClick, className, theme, styles } = props;
	const classNames = classNamesFunction()(styles, props);

	return (
		<UiFabActionButton className={classNames.root} iconProps={iconProps} onClick={onClick}>
			{label}
		</UiFabActionButton>
	);
}

ActionButton.propTypes = {
	/** ActionButton label */
	label: PropTypes.string,
	/** Button is disabled */
	disabled: PropTypes.bool,
	/** Mouse click event handler */
	onClick: PropTypes.func,
	/** User-defined styling */
	styles: PropTypes.func,
	/** ActionButton icon */
	iconProps: PropTypes.shape({
		iconName: PropTypes.string
	})
};

export default styled(customizable('ActionButton', ['theme'])(ActionButton), styles);
