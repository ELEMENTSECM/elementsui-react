import * as React from 'react';
import { Label } from 'elementsui-react';

/** Required Label */
export default function LabelDefault() {
	return (
		<Label id="labelRequired" disabled={false} required={true}>
			Required label
		</Label>
	);
}
