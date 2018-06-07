import * as React from 'react';
import Button from 'elementsui-react/Inputs/Button';

/** Primary button with mouse click handler */
export default function ButtonDefault() {
	return (
		<Button
			id="primaryClickBtn"
			isPrimary={true}
			onClick={() => alert('Clicked')}
			className="button-click">
			Click me
		</Button>
	);
}
