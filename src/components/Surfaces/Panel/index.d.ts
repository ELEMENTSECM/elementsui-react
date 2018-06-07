import * as React from 'react';

export interface PanelProps {
	/**
	 * HTML id tag of the root element
	 */
	id?: string;
	/**
	 * Panel open
	 */
	isOpen?: boolean;
	/**
	 * Panel on dismissed
	 */
	onDismissed?: (...args: any[]) => any;
	/**
	 * Panel header text
	 */
	headerText?: string;
	/**
	 * Panel closebutton aria label
	 */
	closebuttonAriaLabel?: string;
	/**
	 * Panel footer content
	 */
	onRenderFooterContent?: (...args: any[]) => any;
	/**
	 * Panel hasCloseButton
	 */
	hasCloseButton?: boolean;
	/**
	 * User-defined styling
	 */
	styles?: (...args: any[]) => any;
}

declare const Panel: React.SFC<PanelProps>;

export default Panel;
