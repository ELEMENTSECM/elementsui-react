import ModulePicker from 'elementsui-react/Pickers/ModulePicker';
import * as React from 'react';
import Box from 'elementsui-react/Surfaces/Box';

/** ModulePicker example */
export default function ModulePickerDefault() {
	const modules = [
		{
			Id: 'rm'
		},
		{
			Id: 'mm'
		},

		{
			Id: 'sa'
		},
		{
			Id: 'eb'
		}
	];
	return (
		<Box className="modal-content">
			<ModulePicker modules={modules} locale={"en"} />
		</Box>
	);
}
