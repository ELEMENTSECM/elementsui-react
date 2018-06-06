import * as React from 'react';

export type ModuleIconModuleId = 'rm' | 'mm' | 'sa' | 'eb';

export interface ModuleIconProps {
	/**
	 * HTML id tag of the root element
	 */
	id?: string;
	/**
	 * Module Id
	 */
	moduleId?: ModuleIconModuleId;
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
