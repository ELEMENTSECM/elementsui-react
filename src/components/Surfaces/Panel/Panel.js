import React from 'react';
import PropTypes from 'prop-types';
import { Panel as UIFabPanel } from 'office-ui-fabric-react/lib/Panel';
import { styles } from './Panel.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';

/**Panel example */
export function Panel(props) {
	const {
		htmlId,
		headerText,
		onRenderFooterContent,
		isOpen,
		onDismissed,
		hasCloseButton,
		closebuttonAriaLabel,
		styles
	} = props;
	const classNames = classNamesFunction()(styles, props);

	return (
		<UIFabPanel
			id={htmlId}
			className={classNames.root}
			headerText={headerText}
			isOpen={isOpen}
			onDismissed={onDismissed}
			hasCloseButton={hasCloseButton}
			closebuttonAriaLabel={closebuttonAriaLabel}
			onRenderFooterContent={onRenderFooterContent}>
			{props.children}
		</UIFabPanel>
	);
}

Panel.propTypes = {
	/** HTML id tag of the root element */
	htmlId: PropTypes.string,
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
	hasCloseButton: PropTypes.bool,
	/** User-defined styling */
	styles: PropTypes.func
};

export default styled(customizable('Panel', ['theme'])(Panel), styles);
