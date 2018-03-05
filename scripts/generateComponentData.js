const path = require('path');
const chalk = require('chalk');
const parse = require('react-docgen').parse;
const chokidar = require('chokidar');
const utils = require('./utils');

const paths = {
	examples: path.join(__dirname, '../src', 'docs', 'examples'),
	components: path.join(__dirname, '../src', 'components'),
	output: path.join(__dirname, '../config', 'componentData.js')
};

const enableWatchMode = process.argv.slice(2) === '--watch';
if (enableWatchMode) {
	// Regenerate component metadata when components or examples change.
	chokidar
		.watch([paths.examples, paths.components])
		.on('change', function(event, path) {
			generate(paths);
		});
} else {
	// Generate component metadata
	generate(paths);
}

function generate(paths) {
	var errors = [];
	var componentData = utils
		.getDirectories(paths.components)
		.map(componentName => {
			try {
				return getComponentData(paths, componentName);
			} catch (error) {
				errors.push(
					'An error occurred while attempting to generate metadata for ' +
						componentName +
						'. ' +
						error
				);
				return null;
			}
		});
	utils.writeFile(
		paths.output,
		'module.exports = /* eslint-disable */ ' +
			JSON.stringify(errors.length ? errors : componentData)
	);
}

function getComponentData(paths, componentName) {
	var content = utils.readFile(
		path.join(paths.components, componentName, componentName + '.js')
	);
	var info = parse(content);
	return {
		name: componentName,
		description: info.description,
		props: info.props,
		code: content,
		examples: getExampleData(paths.examples, componentName)
	};
}

function getExampleData(examplesPath, componentName) {
	var examples = getExampleFiles(examplesPath, componentName);
	return examples.map(function(file) {
		var filePath = path.join(examplesPath, componentName, file);
		var content = utils.readFile(filePath);
		var info = parse(content);
		return {
			// By convention, component name should match the filename.
			// So remove the .js extension to get the component name.
			name: file.slice(0, -3),
			description: info.description,
			code: content
		};
	});
}

function getExampleFiles(examplesPath, componentName) {
	var exampleFiles = [];
	try {
		exampleFiles = utils.getFiles(path.join(examplesPath, componentName));
	} catch (error) {
		console.log(chalk.red(`No examples found for ${componentName}.`));
	}
	return exampleFiles;
}
