import * as React from 'react';
import Button from 'elementsui-react/Inputs/Button';

/** Disabled button */
export default function ButtonDisabled() {
	return (
		<Button id="disabledBtn" disabled className="button-disabled">
			Disabled button
		</Button>
	);
}
