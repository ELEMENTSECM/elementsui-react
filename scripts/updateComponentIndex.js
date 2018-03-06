const path = require('path');
const utils = require('./utils');

const components = path.join(__dirname, '../src', 'components');
const indexPath = path.join(components, 'index.js');
const exportStrings = [];
getExportStrings(components);

utils.writeFile(indexPath, exportStrings.join('\r'));

function getExportStrings(filePath, relativePath = '.') {
	return utils.getDirectories(filePath).map(x => {
		const children = getExportStrings(path.join(filePath, x), path.join(relativePath, x));

		if (!children || children.length === 0) {
			exportStrings.push(`export { default as ${x} } from '${path.join(relativePath, x)}';`);
		}
	});
}
