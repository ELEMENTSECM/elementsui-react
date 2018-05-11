const path = require('path');
const chokidar = require('chokidar');
const utils = require('../bin/utils');
const func = require('./typingsFunctions');

const components = path.join(__dirname, '../src', 'components');

const enableWatchMode = process.argv.slice(2) === '--watch';

if (enableWatchMode) {
	chokidar.watch([components]).on('change', function(event, path) {
		generateTypings(components);
	});
} else {
	generateTypings(components);
}

function generateTypings(folder, moduleExports = []) {
	return utils
		.getDirectories(folder)
		.filter(x => !x.startsWith('_'))
		.map(x => {
			const children = generateTypings(path.join(folder, x), moduleExports);

			if (!children || children.length === 0) {
				const filePath = path.join(folder, x, x + '.js');
				return func.generateType({
					root: components,
					filePath,
					component: x,
					folder,
					moduleExports
				});
			}
		});
}
