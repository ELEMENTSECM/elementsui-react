const path = require('path');
const generator = require('react-to-typescript-definitions');
const chokidar = require('chokidar');
const utils = require('../bin/utils');
const exec = require('child_process').exec;
const chalk = require('chalk');

const components = path.join(__dirname, '../src', 'components');

const enableWatchMode = process.argv.slice(2) === '--watch';

let moduleExports = [];

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

					let res = `import * as React from 'react';

${stdout
						.replace(/.*declare module '\w+'\s*{\s*import \* as React from 'react';\s*/, '')
						.replace(/.*export default \w+;/, '')
						.replace('export const', 'declare const')
						.slice(0, -6)}`;
					if (res.indexOf('declare const') !== -1) {
						res += `export default ${x};`;
					}
					const relPath = folder.substring(folder.indexOf('components/') + 11, folder.length);

					utils.writeFile(path.join(folder, x, 'index.d.ts'), res);
					moduleExports.push(`export { default as ${x} } from '${relPath}/${x}';
`);
					utils.writeFile(path.join(components, 'index.d.ts'), moduleExports.join(''));
				});
			}
		});
}

function prettier() {
	exec('prettier --write "**/*.d.ts"');
}
