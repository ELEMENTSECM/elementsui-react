import * as React from 'react';
import { Label } from 'elementsui-react';

/** Disabled Label */
export default function LabelDisabled() {
	return <Label htmlId="labelDisabled" disabled={true} required={false} label={'Disabled label'} />;
}
