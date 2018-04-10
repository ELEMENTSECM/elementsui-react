const path = require('path');
const generator = require('react-to-typescript-definitions');
const chokidar = require('chokidar');
const utils = require('../bin/utils');
const exec = require('child_process').exec;
const chalk = require('chalk');

const components = path.join(__dirname, '../src', 'components');

const enableWatchMode = process.argv.slice(2) === '--watch';
if (enableWatchMode) {
	chokidar.watch([components]).on('change', function(event, path) {
		generateTypings(components);
		prettier();
	});
} else {
	generateTypings(components);
	prettier();
}

function generateTypings(folder) {
	return utils
		.getDirectories(folder)
		.filter(x => !x.startsWith('_'))
		.map(x => {
			const children = generateTypings(path.join(folder, x));

			if (!children || children.length === 0) {
				const filePath = path.join(folder, x, x + '.js');
				exec(`react2dts --file ${filePath} --module-name ${x}`, (error, stdout, stderr) => {
					if (error !== null) {
						console.log(chalk.red(`exec error: ${error}`));
					}

					const res = `import * as React from 'react';

${stdout
						.replace(/.*declare module '\w+'\s*{\s*import \* as React from 'react';\s*/, '')
						.replace(/.*export default \w+;/, '')
						.replace('const', 'export const')
						.slice(0, -6)}`;
					utils.writeFile(path.join(folder, x, 'index.d.ts'), res);
				});
			}
		});
}

function prettier() {
	exec('prettier --write "**/*.d.ts"');
}
