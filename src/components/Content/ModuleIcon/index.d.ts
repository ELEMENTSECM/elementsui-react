import * as React from 'react';

export interface ModuleIconProps {
	/**
	 * HTML id tag of the root element
	 */
	htmlId?: string;
	/**
	 * Module Id
	 */
	moduleId?: string;
	/**
	 * Icon color
	 */
	color?: string;
	/**
	 * Icon size
	 */
	size?: number;
}

declare const ModuleIcon: React.SFC<ModuleIconProps>;

export default ModuleIcon;
