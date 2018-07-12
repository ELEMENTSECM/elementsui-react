import * as React from 'react';

export interface ModulePickerModules {
	Id: string;
}

export interface ModulePickerProps {
	/**
	 * HTML id tag of the root element
	 */
	id?: string;
	/**
	 * Application path
	 */
	applicationPath?: string;
	/**
	 * Selected tenant
	 */
	tenantId?: string;
	/**
	 * Array of modules
	 */
	modules?: ModulePickerModules[];
}

declare const ModulePicker: React.SFC<ModulePickerProps>;

export default ModulePicker;
