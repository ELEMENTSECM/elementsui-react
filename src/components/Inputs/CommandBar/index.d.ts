import * as React from 'react';

export interface CommandBarProps {
	/**
	 * HTML id tag of the root element
	 */
	htmlId?: string;
	/**
	 * Items to render
	 */
	items?: any[];
	/**
	 * I to render on the opposite side of those defined in items
	 */
	farItems?: any[];
	/**
	 * User-defined styling
	 */
	styles?: (...args: any[]) => any;
}

declare const CommandBar: React.SFC<CommandBarProps>;

export default CommandBar;
