const path = require('path');
const utils = require('../bin/utils');

const components = path.join(__dirname, '../src', 'components');
const indexPath = path.join(components, 'index.js');
const exportStrings = [];
getExportStrings(components);
exportStrings.push(`export { initializeIcons } from 'office-ui-fabric-react/lib/Icons';`);
utils.writeFile(indexPath, exportStrings.join('\r'));

function getExportStrings(filePath, relativePath = '.') {
	return utils
		.getDirectories(filePath)
		.filter(x => !x.startsWith('_'))
		.map(x => {
			const children = getExportStrings(path.join(filePath, x), path.join(relativePath, x));

			if (!children || children.length === 0) {
				exportStrings.push(`export { default as ${x} } from './${utils.join(relativePath, x)}';`);
			}
		});
}
