import * as React from 'react';
import PropTypes from 'prop-types';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { getStyles } from './ContextualMenu.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';

/** Contextual Menu Button */
export function ContextualMenu(props) {
	const { isPrimary, ariaLabel, buttonText, menuProps, getStyles, className, theme } = props;
	const classNames = classNamesFunction()(getStyles, props);
	return (
		<DefaultButton primary={isPrimary} ariaLabel={ariaLabel} text={buttonText} menuProps={menuProps} />
	);
}

ContextualMenu.propTypes = {
	/** ContextualMenu primary  */
	isPrimary: PropTypes.bool,
	/** ContextualMenu button text */
	buttonText: PropTypes.string,
	/** ContextualMenu button ariaLabel */
	ariaLabel: PropTypes.string,
	/**  ContextualMenu menuitems */
	menuProps: PropTypes.shape({
		items: PropTypes.array
	}).isRequired
};

export default styled(customizable('ContextualMenu', ['theme'])(ContextualMenu), getStyles);
