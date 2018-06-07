import * as React from 'react';

export type MessageBarMessageBarType = 'info' | 'error' | 'blocked' | 'severeWarning' | 'success' | 'warning';

export interface MessageBarProps {
	/**
	 * HTML id tag of the root element
	 */
	id?: string;
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
	 * Dismiss button aria label
	 */
	dismissButtonAriaLabel?: string;
	/**
	 * Truncated message
	 */
	truncated?: boolean;
	/**
	 * Overflow button aria label
	 */
	overflowButtonAriaLabel?: string;
	/**
	 * User-defined styling
	 */
	styles?: (...args: any[]) => any;
}

declare const MessageBar: React.SFC<MessageBarProps>;

export default MessageBar;
