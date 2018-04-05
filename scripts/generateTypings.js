const path = require('path');
const generator = require('react-to-typescript-definitions');
const chokidar = require('chokidar');
const utils = require('./utils');
const exec = require('child_process').exec;
const chalk = require('chalk');

const components = path.join(__dirname, '../src', 'components');
const template = `declare module 'elementsui-react' {
	import * as React from 'react';

	{{t}}
}
`;
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
	generateTypings(components, typeDefs, typeDefPath);
}

function generateTypings(folder, typings, typeDefPath) {
	return utils.getDirectories(folder).map(x => {
		const children = generateTypings(path.join(folder, x), typings, typeDefPath);

		if (!children || children.length === 0) {
			const filePath = path.join(folder, x, x + '.js');
			const source = utils.readFile(filePath);
			exec(`react2dts --file ${filePath} --module-name ${x}`, (error, stdout, stderr) => {
				if (error !== null) {
					console.log(chalk.red(`exec error: ${error}`));
				}

				const res = stdout
					.replace(/.*declare module '\w+'\s*{\s*import \* as React from 'react';\s*/, '')
					.replace(/.*export default \w+;/, '')
					.replace('const', 'export const')
					.slice(0, -6);
				typings.push(res);
				utils.writeFile(typeDefPath, template.replace('{{t}}', typings.join('\r')));
			});
		}
	});
}
