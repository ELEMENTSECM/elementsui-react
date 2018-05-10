import * as React from 'react';

export interface CommandBarProps {
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
	getStyles?: (...args: any[]) => any;
}

declare const CommandBar: React.SFC<CommandBarProps>;

export default CommandBar;
