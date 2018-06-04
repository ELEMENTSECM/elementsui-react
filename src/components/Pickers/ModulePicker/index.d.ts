import * as React from 'react';

export interface ModulePickerModules {
	Id: string;
	Name: string;
}

export interface ModulePickerProps {
	/**
	 * Array of modules
	 */
	modules?: ModulePickerModules[];
}

declare const ModulePicker: React.SFC<ModulePickerProps>;

export default ModulePicker;
