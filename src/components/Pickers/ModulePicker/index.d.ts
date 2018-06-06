import * as React from 'react';

export interface ModulePickerModules {
	Id: string;
	Name: string;
}

export interface ModulePickerProps {
	/**
	 * HTML id tag of the root element
	 */
	htmlId?: string;
	/**
	 * Array of modules
	 */
	modules?: ModulePickerModules[];
}

declare const ModulePicker: React.SFC<ModulePickerProps>;

export default ModulePicker;
