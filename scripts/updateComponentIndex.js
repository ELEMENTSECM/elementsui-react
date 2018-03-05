const path = require('path');
const utils = require('./utils');

const components = path.join(__dirname, '../src', 'components');
const indexPath = path.join(components, 'index.js');
const exportStrings = utils
	.getDirectories(components)
	.map(
		componentName =>
			`export {default as ${componentName}} from './${componentName}';`
	);

utils.writeFile(indexPath, exportStrings.join('\r'));
