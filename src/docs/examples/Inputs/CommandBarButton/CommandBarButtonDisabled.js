import * as React from 'react';
import CommandBarButton from 'elementsui-react/Inputs/CommandBarButton';

/** Button with a 'Microphone' icon that is disabled */
export default function ButtonDefault() {
	return <CommandBarButton text="Disabled" iconName="Microphone" disabled />;
}
