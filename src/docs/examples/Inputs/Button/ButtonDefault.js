import * as React from 'react';
import Button from 'elementsui-react/Inputs/Button';

/** Default button */
export default function ButtonDefault() {
	return (
		<Button id="defaultBtn" isPrimary={false} className="button-default">
			Default button
		</Button>
	);
}
