import * as React from 'react';
import PropTypes from 'prop-types';
import { styles } from './MessageBar.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';
import { MessageBar as FabricMessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

export function MessageBar(props) {
	const { styles, messageBarType, isMultiline, onDismiss } = props;
	const classNames = classNamesFunction()(styles, props);

	const getBarState = messageBarType => {
		switch (messageBarType) {
			case 'blocked':
				return MessageBarType.blocked;
			case 'error':
				return MessageBarType.error;
			case 'info':
				return MessageBarType.info;
			case 'severeWarning':
				return MessageBarType.severeWarning;
			case 'success':
				return MessageBarType.success;
			case 'warning':
				return MessageBarType.warning;
			default:
				return;
		}
	};

	return (
		<FabricMessageBar
			className={classNames.root}
			messageBarType={getBarState(messageBarType)}
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
	styles: PropTypes.func
};

export default styled(customizable('MessageBar', ['theme'])(MessageBar), styles);
