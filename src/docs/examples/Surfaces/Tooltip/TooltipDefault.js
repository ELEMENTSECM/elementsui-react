import * as React from 'react';
import Tooltip from 'elementsui-react/Surfaces/Tooltip';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';

/**Default Tooltip */
export default function TooltipDefault() {
	const elementText = 'I have a tooltip';
	return (
		<Tooltip htmlId="defaultTooltip" content="I'm showing tooltip">
			<PrimaryButton>{elementText}</PrimaryButton>
		</Tooltip>
	);
}
