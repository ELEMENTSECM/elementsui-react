import * as React from 'react';
import PropTypes from 'prop-types';
import { CommandBarButton as FabricCommandBarButton } from 'office-ui-fabric-react/lib/Button';
import { styles } from './CommandBarButton.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';

/** CommandBarButton example */
export function CommandBarButton(props) {
	const { htmlId, text, disabled, onClick, iconName, styles } = props;
	const classNames = classNamesFunction()(styles, props);
	return (
		<FabricCommandBarButton
			id={htmlId}
			className={classNames.root}
			text={text}
			disabled={disabled}
			onClick={onClick}
			iconProps={{ iconName: iconName }}
		/>
	);
}

CommandBarButton.propTypes = {
	/** HTML id tag of the root element */
	htmlId: PropTypes.string,
	/** Button label */
	text: PropTypes.string,
	/** Button is disabled */
	disabled: PropTypes.bool,
	/** Mouse click event handler */
	onCLick: PropTypes.func,
	/** Icon name */
	iconName: PropTypes.string,
	/** User-defined styling */
	styles: PropTypes.func
};

export default styled(customizable('CommandBarButton', ['theme'])(CommandBarButton), styles);
