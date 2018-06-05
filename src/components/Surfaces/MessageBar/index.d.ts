import * as React from 'react';

export type MessageBarMessageBarType = 'info' | 'error' | 'blocked' | 'severeWarning' | 'success' | 'warning';

export interface MessageBarProps {
	/**
	 * Message bar type. Valid values are: 'info', 'error', 'blocked', 'severeWarning', 'success', 'warning'
	 */
	messageBarType?: MessageBarMessageBarType;
	/**
	 * Should the message be multiline?
	 */
	isMultiline?: boolean;
	/**
	 * What should happen when dismissed
	 */
	onDismiss?: any;
	/**
	 * User-defined styling
	 */
	styles?: (...args: any[]) => any;
}

declare const MessageBar: React.SFC<MessageBarProps>;

export default MessageBar;
