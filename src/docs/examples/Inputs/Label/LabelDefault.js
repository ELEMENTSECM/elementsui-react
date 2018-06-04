import * as React from 'react';
import { Label } from 'elementsui-react';

/** Default Label */
export default function LabelDefault() {
	return (
		<Label id="labelDefault" disabled={false} required={false}>
			Default label
		</Label>
	);
}
