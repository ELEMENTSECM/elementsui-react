import * as React from 'react';
import PropTypes from 'prop-types';
import { getStyles } from './MessageBar.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';
import { MessageBar as FabricMessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

export function MessageBar(props) {
	const { getStyles, messageBarType, isMultiline, onDismiss } = props;
	const classNames = classNamesFunction()(getStyles, props);
	return (
		<FabricMessageBar
			className={classNames.root}
			messageBarType={MessageBarType[messageBarType]}
			isMultiline={isMultiline}
			onDismiss={onDismiss}>
			{props.children}
		</FabricMessageBar>
	);
}

MessageBar.propTypes = {
	/** Message bar type. Valid values are: 'info', 'error', 'blocked', 'severeWarning', 'success', 'warning' */
	messageBarType: PropTypes.oneOf(['info', 'error', 'blocked', 'severeWarning', 'success', 'warning']),
	/** Should the message be multiline? */
	isMultiline: PropTypes.bool,
	/** What should happen when dismissed */
	onDismiss: PropTypes.any,
	/** User-defined styling */
	getStyles: PropTypes.func
};

export default styled(customizable('MessageBar', ['theme'])(MessageBar), getStyles);
