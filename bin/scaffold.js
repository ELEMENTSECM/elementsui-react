const cwd = process.cwd();

const mkdirp = require('mkdirp');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const utils = require('./utils');
let config = {};

const errors = [];
let tpl = path.join(__dirname, 'templates');
let extension;

String.prototype.splice = function splice(start, delCount, newSubStr) {
	return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
};

function writeFiles(name, dir, file, test, ext) {
	mkdirp.sync(dir);
	ext = ext || extension;
	const filePath = `${dir}/${config.separateIndexFiles ? name : 'index'}.${ext}`;
	const testPath = `${dir}/${config.separateIndexFiles ? name : 'index'}.spec.${extension}`;
	utils.writeFile(filePath, file);
	utils.writeFile(testPath, test);
	if (config.separateIndexFiles) {
		const exportString = `export { default } from './${name}';`;
		const indexPath = `${dir}/index.${ext}`;
		utils.writeFile(indexPath, exportString);
	}
}

function writeAction(name) {
	try {
		const at = require(tpl + '/action');
		const capitalizedName = utils.capitalize(name);
		const action = at.actionTemplate(capitalizedName);
		const actionTest = at.actionTestTemplate(capitalizedName);
		const dir = path.join(cwd, config.actions, capitalizedName);
		writeFiles(capitalizedName, dir, action, actionTest);
		console.log(chalk.green(`${capitalizedName} action has been created at ${dir}/`));
	} catch (error) {
		errors.push({ name, error });
	}
}

function writeModel(name) {
	try {
		const mt = require(tpl + '/model');
		const capitalizedName = utils.capitalize(name);
		const model = mt.modelTemplate(capitalizedName);
		const dir = path.join(cwd, config.models);
		utils.writeFile(`${dir + capitalizedName}Model.${extension}`, model);
		console.log(chalk.green(`${capitalizedName}Model model has been created at ${dir}`));
	} catch (error) {
		errors.push({ name, error });
	}
}

function writeReducer(name) {
	try {
		const rt = require(tpl + '/reducer');
		const capitalizedName = utils.capitalize(name);
		const reducer = rt.reducerTemplate(capitalizedName);
		const reducerTest = rt.reducerTestTemplate(capitalizedName);
		const dir = path.join(cwd, config.reducers, capitalizedName);
		writeFiles(capitalizedName, dir, reducer, reducerTest);
		console.log(chalk.green(`${capitalizedName} reducer has been created at ${dir}/`));
	} catch (error) {
		errors.push({ name, error });
	}
}

function writeComponent({ name, lang }, { stateful = false, container = false, page = false } = {}) {
	try {
		const ct = require(tpl + '/component');
		const capitalizedName = utils.capitalize(name);

		const dir = path.join(
			cwd,
			container ? config.containers : page ? config.pages : config.components,
			capitalizedName
		);

		const componentTemplate = page ? ct.pageTemplate : ct.componentTemplate;

		const component = componentTemplate(capitalizedName, {
			stateful,
			container
		});
		const componentTest = ct.componentTestTemplate(capitalizedName, {
			stateful,
			container
		});

		writeFiles(capitalizedName, dir, component, componentTest);
		console.log(chalk.green(`${capitalizedName} component has been created at ${dir}`));
	} catch (error) {
		errors.push({ name, error });
	}
}

function writeController({ name }, { action, verb }) {
	const ctr = require(tpl + '/controller');
	const controller = ctr.controllerTemplate(action);
	const controllerTest = ctr.controllerTestTemplate(name, action, verb);
	const router = ctr.routerTemplate(name, action, verb);
	const dir = path.join(cwd, config.controllers, name);
	const routerPath = path.join(cwd, config.routes, `${name}.js`);
	writeFiles(name, dir, controller, controllerTest, 'js');
	console.log(chalk.green(`${name} controller has been created at ${dir}`));
	utils.writeFile(routerPath, router);
	console.log(chalk.green(`${name} router has been created at ${routerPath}`));

	const indexRouterPath = path.join(cwd, config.routes, `index.js`);
	let indexRouter = utils.readFile(indexRouterPath);
	if (indexRouter) {
		const index = indexRouter.indexOf('const router = express.Router()');
		indexRouter = indexRouter.splice(
			index + 31,
			0,
			`
router.use('/${name.toLowerCase()}', ${name}Rtr)`
		);

		indexRouter = indexRouter.splice(
			index - 1,
			0,
			`import ${name}Rtr from './${name}'
`
		);
		utils.writeFile(indexRouterPath, indexRouter);
		console.log(chalk.blue(`${name} router added in ${indexRouterPath}`));
		console.log(chalk.blue(`New endpoint: ${verb} /fetch/${name}/${action}`));
	}
}

function modifyState(name) {
	try {
		const capName = utils.capitalize(name);
		const filePath = path.join(cwd, config.state);
		let state = utils.readFile(filePath);
		const stateIndex = state.indexOf('export interface RootState {');
		state = state.splice(
			stateIndex + 28,
			0,
			`
	${name}?: RootState.${capName}State`
		);
		const nsIndex = state.indexOf('export namespace RootState {');
		state = state.splice(
			nsIndex + 28,
			0,
			`
	export type ${capName}State = ${capName}Model`
		);

		state = state.splice(
			stateIndex - 1,
			0,
			`import { ${capName}Model } from 'models/${capName}Model'
`
		);

		utils.writeFile(filePath, state);
		console.log(chalk.blue(`RootState.${capName}State added in ${filePath}`));
	} catch (error) {
		errors.push({ name, error });
	}
}

function modifyRootReducer(name) {
	try {
		const capName = utils.capitalize(name);
		const filePath = path.join(cwd, config.reducers, 'index.tsx');
		let reducer = utils.readFile(filePath);
		const exportIndex = reducer.indexOf('export');
		reducer = reducer.splice(
			exportIndex - 1,
			0,
			`import { ${capName}Reducer } from 'reducers/${capName}'
`
		);
		const typeIndex = reducer.indexOf('<RootState>({');
		reducer = reducer.splice(
			typeIndex + 13,
			0,
			`
	${name}: ${capName}Reducer,`
		);

		utils.writeFile(filePath, reducer);
		console.log(chalk.blue(`${name}: ${capName}Reducer added in ${filePath}`));
	} catch (error) {
		errors.push({ name, error });
	}
}

function writeStore({ name }) {
	writeModel(name);
	writeAction(name);
	writeReducer(name);
	modifyState(name);
	modifyRootReducer(name);
}

function scaffold(item, options) {
	//TODO: add templates for store
	if (item.lang === 'ES6') {
		if (item.type === 'store') {
			console.log(chalk.red('ES6 stores are not currently supported.'));
			return;
		}

		if (item.type === 'container') {
			console.log(chalk.red('ES6 containers are not currently supported.'));
			return;
		}
	}

	config = require(cwd + '/elementsui.config.json');
	tpl = path.join(tpl, item.lang === 'ES6' ? 'es' : 'ts');
	extension = item.lang === 'ES6' ? 'js' : 'tsx';

	switch (item.type) {
		case 'component': {
			writeComponent(item, options);
			break;
		}
		case 'container': {
			writeComponent(item, { container: true, stateful: true });
			break;
		}
		case 'page': {
			writeComponent(item, { page: true });
			break;
		}
		case 'store': {
			writeStore(item);
			break;
		}
		case 'action': {
			writeAction(item.name);
			break;
		}
		case 'reducer': {
			writeReducer(item.name);
			break;
		}
		case 'controller':
			writeController(item, options);
			break;
		default:
			console.error(chalk.red(`Unknown command: ${item.type}`));
			process.exit(1);
	}
	if (errors.length > 0) {
		const errorStr = `Failed to create the following ${item.type}s:
	${errors.map(({ name, error }) => `${name}: ${error.message}`).join('\n')}`;
		console.error(chalk.red(errorStr));
	}
}

let cmdValue;
let namesArray;

module.exports = scaffold;
