import * as React from 'react';
import ModuleIcon from 'elementsui-react/Content/ModuleIcon';

/** Elements module icons */
export default function ModuleIconDefault() {
	return (
		<div>
			{['rm', 'mm', 'sa', 'eb'].map(moduleId => (
				<div key={moduleId} style={{ height: 100 }}>
					<ModuleIcon color="#2d8498" size={60} moduleId={moduleId} />
				</div>
			))}
		</div>
	);
}
