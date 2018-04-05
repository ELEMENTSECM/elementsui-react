import * as React from 'react';
import Button from 'elementsui-react/Inputs/Button';

/** Default button with mouse click handler */
export default function ButtonDefault() {
	return <Button htmlId="defaultBtn" label="Click me" onClick={() => alert('Clicked')} />;
}
