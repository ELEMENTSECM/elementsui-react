import ModulePicker from 'elementsui-react/Pickers/ModulePicker';
import * as React from 'react';
import Box from 'elementsui-react/Surfaces/Box';

/** ModulePicker example */
export default function ModulePickerDefault() {
	const modules = [
		{
			Id: 'rm',
			Name: 'Record Management'
		},
		{
			Id: 'mm',
			Name: 'Meeting Module'
		},

		{
			Id: 'sa',
			Name: 'System administration'
		},
		{
			Id: 'eb',
			Name: 'eBuildingCase'
		}
	];
	return (
		<Box className="modal-content">
			<ModulePicker modules={modules} />
		</Box>
	);
}
