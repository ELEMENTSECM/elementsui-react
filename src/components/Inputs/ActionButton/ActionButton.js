import * as React from 'react';
import PropTypes from 'prop-types';
import { ActionButton as UiFabActionButton } from 'office-ui-fabric-react/lib/Button';
import { styles } from './ActionButton.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';

export function ActionButton(props) {
	const { label, children, iconProps, onClick, className, theme, styles } = props;
	const classNames = classNamesFunction()(styles, props);

	return (
		<UiFabActionButton className={classNames.root} iconProps={iconProps} onClick={onClick}>
			{label || children}
		</UiFabActionButton>
	);
}

ActionButton.propTypes = {
	/** ActionButton label (children are ignored if label is defined) */
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
	}),
	/** Label as children */
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default styled(customizable('ActionButton', ['theme'])(ActionButton), styles);
