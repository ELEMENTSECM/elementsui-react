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
	chokidar.watch([paths.examples, paths.components]).on('change', function(event, path) {
		generate(paths);
	});
} else {
	// Generate component metadata
	generate(paths);
}

function generate(paths) {
	let errors = [];

	var componentData = generateComponentData(paths.components);
	utils.writeFile(
		paths.output,
		'module.exports = /* eslint-disable */ ' + JSON.stringify(errors.length ? errors : componentData)
	);
}

function generateComponentData(filepath, relativePath = '') {
	return utils.getDirectories(filepath).map(x => {
		const currentPath = utils.join(relativePath, x);
		const children = generateComponentData(path.join(filepath, x), currentPath);

		const nodePath = path.join(filepath, x);
		let node = {
			name: x,
			children,
			relativePath: currentPath
		};

		if (!node.children || node.children.length === 0) {
			try {
				const content = utils.readFile(path.join(nodePath, node.name + '.js'));
				const info = parse(content);
				node.component = {
					name: node.name,
					description: info.description,
					props: info.props,
					code: content,
					examples: getExampleData(nodePath),
					relativePath: currentPath
				};
			} catch (error) {
				errors.push(
					`An error occurred while attempting to generate metadata for ${node.name}. ${error}`
				);
			}
		}

		return node;
	});
}

function getExampleData(componentPath) {
	componentPath = componentPath.replace(paths.components, paths.examples);
	var examples = getExampleFiles(componentPath);
	return examples.map(function(file) {
		const filePath = path.join(componentPath, file);
		const content = utils.readFile(filePath);
		const info = parse(content);
		return {
			// By convention, component name should match the filename.
			// So remove the .js extension to get the component name.
			name: file.slice(0, -3),
			description: info.description,
			code: content
		};
	});
}

function getExampleFiles(componentPath) {
	let exampleFiles = [];
	try {
		exampleFiles = utils.getFiles(componentPath);
	} catch (error) {
		console.log(chalk.red(`No examples found for ${componentPath}.`));
	}
	return exampleFiles;
}
