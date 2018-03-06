const path = require('path');
const generator = require('react-to-typescript-definitions');
const chokidar = require('chokidar');
const utils = require('./utils');

const components = path.join(__dirname, '../src', 'components');

const enableWatchMode = process.argv.slice(2) === '--watch';
if (enableWatchMode) {
	chokidar.watch([components]).on('change', function(event, path) {
		generate(components);
	});
} else {
	generate(components);
}

function generate(components) {
	let typeDefs = [];
	const typeDefPath = path.join(components, 'index.d.ts');
	generateTypings(components, typeDefs);

	utils.writeFile(typeDefPath, typeDefs.join('\r'));
}

function generateTypings(folder, typings) {
	return utils.getDirectories(folder).map(x => {
		const children = generateTypings(path.join(folder, x), typings);

		if (!children || children.length === 0) {
			const filePath = path.join(folder, x, x + '.js');
			const typeDef = generator.generateFromFile(x, filePath);
			typings.push(typeDef);
		}
	});
}
