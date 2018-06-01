import * as React from 'react';

export interface ModuleIconProps {
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
