import * as React from 'react';
import Button from 'elementsui-react/Inputs/Button';

/** Primary button */
export default function ButtonPrimary() {
	return <Button htmlId="primaryBtn" label="Default button" isPrimary={true} className="button-primary" />;
}
