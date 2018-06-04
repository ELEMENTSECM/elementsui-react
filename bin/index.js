#!/usr/bin/env node

const program = require('commander');
const { prompt } = require('inquirer');
const prompts = require('./prompts');
const scaffold = require('./scaffold');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const utils = require('./utils');
const CONFIG_NAME = 'elementsui.config.json';
const nls = require('./nls');

function configExists() {
	console.log(process.cwd());
	return _.some(fs.readdirSync(process.cwd()).filter(x => x === CONFIG_NAME));
}

function writeConfig(config) {
	utils.writeFile(path.join(process.cwd(), CONFIG_NAME), JSON.stringify(config));
	console.log(chalk.green(`${CONFIG_NAME} has been created.`));
}

function initNlsPrompt() {
	prompt(prompts.nls).then(nls.addTranslations);
}

function initPrompt() {
	prompt(prompts.init).then(answer => {
		let optionsPrompt;
		switch (answer.type) {
			case 'component':
				optionsPrompt = prompt(prompts.component);
				break;
			case 'container':
				optionsPrompt = prompt(prompts.container);
				break;
			case 'page':
				optionsPrompt = prompt(prompts.page);
				break;
			case 'store':
				optionsPrompt = prompt(prompts.store);
				break;
			case 'action':
				optionsPrompt = prompt(prompts.action);
				break;
			case 'reducer':
				optionsPrompt = prompt(prompts.reducer);
				break;
			case 'controller':
				optionsPrompt = prompt(prompts.controller);
				break;
			default:
				console.log(chalk.red('Unsupported command'));
				return;
		}

		optionsPrompt.then(options => scaffold(answer, options));
	});
}

program.version('0.0.1').description('ElementsUI scaffolding tool');

program
	.command('create')
	.alias('c')
	.description('Scaffold a new component/container/store')
	.action(() => {
		if (!configExists()) {
			prompt(prompts.config).then(config => {
				writeConfig(config);
				initPrompt();
			});
		} else {
			initPrompt();
		}
	});
program
	.command('translate')
	.alias('t')
	.description('Add i18n record to <ComponentName>.nls.json')
	.action(() => {
		if (!configExists()) {
			prompt(prompts.config).then(config => {
				writeConfig(config);
				initNlsPrompt();
			});
		} else {
			initNlsPrompt();
		}
	});
program.parse(process.argv);
