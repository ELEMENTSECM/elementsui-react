import * as React from 'react';
import PropTypes from 'prop-types';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { styles } from './ContextualMenu.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';

/** Contextual Menu Button */
export function ContextualMenu(props) {
	const { styles, buttonText, isPrimary } = props;
	const classNames = classNamesFunction()(styles, props);
	return <DefaultButton className={classNames.root} text={buttonText} primary={isPrimary} {...props} />;
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
	}).isRequired,
	/** Contextual menu icon properties */
	menuIconProps: PropTypes.shape({
		/** The name of the icon to use from the icon font. If string is empty, a placeholder icon will be rendered the same width as an icon */
		iconName: PropTypes.string,
		/** The aria label of the button for the benefit of screen readers.*/
		ariaLabel: PropTypes.string,
		/** The type of icon to render: 0 - default, 1 - image */
		iconType: PropTypes.oneOf([0, 1])
	}),
	/** User-defined styling */
	styles: PropTypes.func
};

export default styled(customizable('ContextualMenu', ['theme'])(ContextualMenu), styles);
