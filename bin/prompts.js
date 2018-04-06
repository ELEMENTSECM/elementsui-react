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
	}
];

const init = [
	{
		type: 'list',
		name: 'type',
		message: 'What do you want to create?',
		choices: ['component', 'container', 'page', 'store']
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
	}
];

const container = [];

const page = [];

const store = [];

module.exports = {
	config,
	init,
	component,
	container,
	page,
	store
};
