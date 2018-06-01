import * as React from 'react';
import ModuleIcon from 'elementsui-react/Content/ModuleIcon';

/** Elements module icons */
export default function ModuleIconDefault() {
	const modules = ['rm', 'mm', 'sa', 'eb'];
	return (
		<div>
			{modules.map(moduleId => (
				<ModuleIcon key={moduleId} color="#2d8498" size={100} moduleId={moduleId} />
			))}
		</div>
	);
}
