import * as React from 'react';
import { Label } from 'elementsui-react';

/** Required Label */
export default function LabelDefault() {
	return <Label htmlId="labelRequired" disabled={false} required={true}></Label>;
}
