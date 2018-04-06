import * as React from 'react';
import { Dropdown } from 'elementsui-react';

/** Dropdown with options and placeholder */
export default function DropdownDefault() {
	const options = [
		{
			key: 1,
			text: 'Option 1'
		},
		{
			key: 2,
			text: 'Option 2'
		},
		{
			key: 3,
			text: 'Option 3'
		}
	];

	return <Dropdown id="testDropdown" label="test dropdown" placeHolder="Select..." options={options} />;
}
