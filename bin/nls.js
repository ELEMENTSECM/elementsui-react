const path = require('path');
const chalk = require('chalk');
const utils = require('./utils');
const cwd = process.cwd();
const _ = require('lodash');
const template = require('./templates/nls.json');

let config = {};

function setLastUsed(currentValue) {
	const filePath = path.join(__dirname, 'lastUsed.txt');
	utils.writeFile(filePath, currentValue);
}

function addTranslations({ componentPath, id, en, nb, nn, sv }) {
	config = require(cwd + '/elementsui.config.json');
	setLastUsed(componentPath);

	const folder = path.join(cwd, config.components, componentPath);
	const fileName = `${componentPath.substr(componentPath.lastIndexOf('/') + 1).replace('_', '')}.nls.json`;
	const nlsPath = path.join(folder, fileName);
	let nls;
	try {
		const nlsString = utils.readFile(nlsPath);
		nls = JSON.parse(nlsString);
	} catch (e) {
		console.log(chalk.blue(`nls file not found. Creating ${fileName}....`));
		nls = template;
	}

	nls.en[id] = en;
	nls.nb[id] = nb;
	nls.nn[id] = nn;
	nls.sv[id] = sv;

	utils.writeFile(nlsPath, JSON.stringify(nls));
	console.log(chalk.green(`nls string added: ${id}`));
}

module.exports = {
	addTranslations
};
