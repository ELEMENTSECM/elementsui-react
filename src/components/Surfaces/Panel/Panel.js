import React from 'react';
import PropTypes from 'prop-types';
import { Panel as UIFabPanel } from 'office-ui-fabric-react/lib/Panel';
import { getStyles } from './Panel.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';

/**Panel example */
export function Panel(props) {
	const {
		headerText,
		element,
		onRenderFooterContent,
		isOpen,
		onDismissed,
		hasCloseButton,
		closebuttonAriaLabel,
		className,
		theme,
		getStyles
	} = props;
	const classNames = classNamesFunction()(getStyles, props);

	return (
		<UIFabPanel
			className={classNames.root}
			headerText={headerText}
			isOpen={isOpen}
			onDismissed={onDismissed}
			hasCloseButton={hasCloseButton}
			closebuttonAriaLabel={closebuttonAriaLabel}
			onRenderFooterContent={onRenderFooterContent}>
			{element}
		</UIFabPanel>
	);
}

Panel.propTypes = {
	/**Panel open */
	isOpen: PropTypes.bool,
	/**Panel on dismissed */
	onDismissed: PropTypes.func,
	/**Panel header text */
	headerText: PropTypes.string,
	/**Panel closebutton aria label */
	closebuttonAriaLabel: PropTypes.string,
	/**Panel footer content */
	onRenderFooterContent: PropTypes.func,
	/**Panel hasCloseButton */
	hasCloseButton: PropTypes.bool
};

export default styled(customizable('Panel', ['theme'])(Panel), getStyles);
