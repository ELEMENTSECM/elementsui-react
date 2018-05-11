const path = require('path');
const utils = require('../bin/utils');
const exec = require('child_process').exec;
const chalk = require('chalk');

function generateType(options, cb = generationCallback) {
	return exec(
		`react2dts --file ${options.filePath} --module-name ${options.component}`,
		(error, stdout) => {
			cb(error, stdout, options);
		}
	);
}

function generationCallback(error, stdout, options) {
	const { root, component, folder, moduleExports } = options;
	if (error !== null) {
		console.log(chalk.red(`exec error: ${error}`));
	}
	const result = composeType(stdout, component, folder);
	moduleExports.push(result.exportString);
	writeType(result, folder, moduleExports, root);
}

function composeType(stdout, component, folder) {
	let res = `import * as React from 'react';

${stdout
		.replace(/.*declare module '\w+'\s*{\s*import \* as React from 'react';\s*/, '')
		.replace(/.*export default \w+;/, '')
		.replace('export const', 'declare const')
		.slice(0, -6)}`;
	if (res.indexOf('declare const') !== -1) {
		res += `export default ${component};`;
	}
	const relPath = folder.substring(folder.indexOf('components') + 11, folder.length);
	const exportString = `export { default as ${component} } from './${relPath}/${component}';
`;
	return {
		name: component,
		types: res,
		exportString
	};
}

function writeType(options, folder, moduleExports, root) {
	utils.writeFile(path.join(folder, options.name, 'index.d.ts'), options.types);
	utils.writeFile(path.join(root, 'index.d.ts'), moduleExports.join(''));
}

module.exports = {
	composeType,
	generateType
};
