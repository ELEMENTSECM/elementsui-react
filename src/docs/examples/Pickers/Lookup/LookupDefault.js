import * as React from 'react';
import Lookup from 'elementsui-react/Pickers/Lookup';

/** DateTimePicker */
export default function DateTimePickerDefault() {
	const options = [
		{ value: 'chocolate', label: 'Chocolate' },
		{ value: 'strawberry', label: 'Strawberry' },
		{ value: 'vanilla', label: 'Vanilla' }
	];

	return (
		<Lookup
			options={options}
			onChange={selected => alert('value: ' + selected.value + '. label: ' + selected.label)}
		/>
	);
}
