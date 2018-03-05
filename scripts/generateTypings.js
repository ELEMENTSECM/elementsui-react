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
	var errors = [];
	const typeDefPath = path.join(components, 'index.d.ts');
	var typeDefs = utils.getDirectories(components).map((componentName) => {
		try {
			const filePath = path.join(
				components,
				componentName,
				componentName + '.js'
			);

			return generator.generateFromFile(componentName, filePath);
		} catch (error) {
			errors.push(
				'An error occurred while attempting to generate type definition for ' +
					componentName +
					'. ' +
					error
			);
		}
	});

	utils.writeFile(typeDefPath, typeDefs.join('\r'));
}
