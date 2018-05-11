import { composeType, generateType } from '../typingsFunctions';
import path from 'path';
const utils = require('../../bin/utils');

const root = path.join(__dirname, 'components');

describe('generateTypings', () => {
	function sharedCallback(error, stdout, options, typeRef) {
		const { component, folder } = options;
		expect(error).toBe(null);
		const result = composeType(stdout, component, folder);
		const indexRef = utils.readFile(path.join(root, 'index.d.ts'));
		expect(indexRef.replace(/\s/g, '').indexOf(result.exportString.replace(/\s/g, '')) !== -1).toBe(true);
		expect(result.types.replace(/\s/g, '')).toBe(typeRef.replace(/\s/g, ''));
	}

	test('writeTyping generates correctly for stateless component', done => {
		function generationCallback(error, stdout, options) {
			const typeRef = utils.readFile(path.join(root, 'stateless', 'index.d.ts'));
			sharedCallback(error, stdout, options, typeRef);
			done();
		}

		const filePath = path.join(__dirname, 'components', 'stateless', 'Stateless.js');
		const folder = path.join(__dirname, 'components', 'stateless');

		generateType(
			{
				root,
				filePath,
				component: 'Stateless',
				folder,
				moduleExports: []
			},
			generationCallback
		);
	});

	test('writeTyping generates correctly for stateful component', done => {
		function generationCallback(error, stdout, options) {
			const typeRef = utils.readFile(path.join(root, 'stateful', 'index.d.ts'));
			sharedCallback(error, stdout, options, typeRef);
			done();
		}

		const folder = path.join(__dirname, 'components', 'stateful');
		const filePath = path.join(folder, 'Stateful.js');

		generateType(
			{
				root,
				filePath,
				component: 'Stateful',
				folder,
				moduleExports: []
			},
			generationCallback
		);
	});
});
