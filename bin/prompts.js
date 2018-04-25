const config = [
	{
		type: 'input',
		name: 'components',
		message:
			"ElementsUI config does not exist in the project's root folder. Let's perform a quick initial setup. \r\nRelative path to components folder:",
		default: 'frontend/src/components/'
	},
	{
		type: 'input',
		name: 'containers',
		message: 'Relative path to containers folder:',
		default: 'frontend/src/containers/'
	},
	{
		type: 'input',
		name: 'pages',
		message: 'Relative path to pages folder:',
		default: 'frontend/src/pages/'
	},
	{
		type: 'input',
		name: 'models',
		message: 'Relative path to models folder:',
		default: 'frontend/src/models/'
	},
	{
		type: 'input',
		name: 'actions',
		message: 'Relative path to actions folder:',
		default: 'frontend/src/actions/'
	},
	{
		type: 'input',
		name: 'reducers',
		message: 'Relative path to reducers folder:',
		default: 'frontend/src/reducers/'
	},
	{
		type: 'input',
		name: 'state',
		message: 'Relative path to state:',
		default: 'frontend/src/store/state.tsx'
	},
	{
		type: 'input',
		name: 'controllers',
		message: 'Relative path to controllers:',
		default: 'backend/controllers/'
	},
	{
		type: 'input',
		name: 'routes',
		message: 'Relative path to routers:',
		default: 'backend/routes/'
	},
	{
		type: 'confirm',
		name: 'separateIndexFiles',
		message: 'Create a separate index files with default exports per component?',
		default: false
	}
];

const init = [
	{
		type: 'list',
		name: 'type',
		message: 'What do you want to create?',
		choices: ['component', 'container', 'page', 'store', 'action', 'reducer', 'controller']
	},
	{
		type: 'list',
		name: 'lang',
		message: 'ES or Typescript?',
		choices: ['ES6', 'Typescript']
	},
	{
		type: 'input',
		name: 'name',
		message: 'Name...'
	}
];

const component = [
	{
		type: 'confirm',
		name: 'stateful',
		message: 'Stateful?',
		default: false
	},
	{
		type: 'confirm',
		name: 'styled',
		message: 'Styled?',
		default: false
	}
];

const container = [];

const page = [];

const store = [];

const action = [];

const reducer = [];

const controller = [
	{
		type: 'input',
		name: 'action',
		message: 'Action name...',
		default: 'template'
	},
	{
		type: 'list',
		name: 'verb',
		message: 'Select verb:',
		choices: ['GET', 'POST', 'PUT', 'DELETE']
	}
];

module.exports = {
	config,
	init,
	component,
	container,
	page,
	store,
	action,
	reducer,
	controller
};
