import * as React from 'react';
import CommandBarButton from 'elementsui-react/Inputs/CommandBarButton';

/** Clickable button with mouse click handler and a 'Mail' icon */
export default function ButtonDefault() {
	return <CommandBarButton text="Click me" onClick={() => alert('Clicked')} iconName="Mail" />;
}
