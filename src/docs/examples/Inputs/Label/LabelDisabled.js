import * as React from 'react';
import { Label } from 'elementsui-react';

/** Disabled Label */
export default function LabelDisabled() {
	return (
		<Label id="labelDisabled" disabled={true} required={false}>
			Disabled label
		</Label>
	);
}
