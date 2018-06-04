import * as React from 'react';
import Button from 'elementsui-react/Inputs/Button';

/** Primary button */
export default function ButtonPrimary() {
	return (
		<Button id="primaryBtn" isPrimary={true} className="button-primary">
			Primary button
		</Button>
	);
}
