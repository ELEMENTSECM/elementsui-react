
const utils = require("../../utils");

const sagaTemplate = name => {
	const uppercased = name.toUpperCase();
	const camelCased = utils.camelCase(name);
	return `import { effects } from "redux-saga";
import AppContext from "../../../../../AppContext";
import * as actions from "../../../../actions/${camelCased}Actions";
import { fetchObject, execute } from "../../../../sagas/odataSaga";
import { ${name} } from "../../../../store/models";
import { createSchema } from "../../../../store/schema";

const expands = {
	FormFields: true,
	"Permissions.RequiredFields": true
};

const ${name}Schema = createSchema("${camelCased}s");

export function* get() {
	while (true) {
		const action = yield effects.take(actions.GET_${uppercased});
		const id = action.payload;
		const query = id
			? AppContext.current.em.getRawReadQuery("${name}")
			: AppContext.current.em.${camelCased}Repository.${name}Template();

		yield effects.fork(fetchObject, query.expand(expands), ${name}Schema, id, action.meta.onSuccess);
	}
}

export function* create() {
	while (true) {
		const action = yield effects.take(actions.CREATE_${uppercased});
		const ${camelCased} = action.payload;
		const query = AppContext.current.em
			.getCreationQuery<${name}>(${camelCased}, undefined, "${name}")
			.expand(expands);

		yield effects.fork(fetchObject, query, ${name}Schema, undefined, action.meta.onSuccess);
	}
}

export function* update() {
	while (true) {
		const action = yield effects.take(actions.UPDATE_${uppercased});
		const ${camelCased} = action.payload;
		const query = AppContext.current.em.getUpdateQuery<${name}>(${camelCased}, "${name}").expand(expands);

		yield effects.fork(fetchObject, query, ${name}Schema, ${camelCased}.Id, action.meta.onSuccess);
	}
}

export function* remove() {
	while (true) {
		const action = yield effects.take(actions.DELETE_${uppercased});
		const ${camelCased} = action.payload;
		const query = AppContext.current.em.getDeleteQuery(${camelCased}, "${name}");
		yield effects.fork(execute, query, action.meta.onSuccess);
	}
}

export default function* ${camelCased}Saga() {
	yield effects.all([ get(), create(), update(), remove() ]);
}
`
}

const sagaTestTemplate = name => {
	const uppercased = name.toUpperCase();
	const camelCased = utils.camelCase(name);
	return `import { effects } from "redux-saga";
import * as actions from "../../../../actions/${camelCased}Actions";
import { get, create, update, remove } from "./${camelCased}Saga";
import ODataQuery from "../../../../../utils/ODataQuery";
import { setup } from "../../../../test/testInit";

beforeEach(() => {
	setup(jest);
});

describe("notificationsSaga - CRUD", () => {
	const getGen = get();
	const createGen = create();
	const updateGen = update();
	const removeGen = remove();
	// GET
	test("Waits for GET_${uppercased}", () => {
		expect(getGen.next().value).toEqual(effects.take(actions.GET_${uppercased}));
	});

	test("Queries ${name} by Id", () => {
		const effect = getGen.next(actions.get${name}("TS")).value as effects.ForkEffect;
		const query = effect.FORK.args[0] as ODataQuery<{}>;
		expect(query.settings.resource).toBe("${name}");
		expect(query.settings.expands.FormFields).toBeTruthy();
		expect(effect.FORK.args[2]).toBe("TS");
	});

	test("Queries ${name}Template if no Id", () => {
		getGen.next();
		const effect = getGen.next(actions.get${name}()).value as effects.ForkEffect;
		expect(effect.FORK.args[2]).toBeUndefined();
	});

	// CREATE
	test("Waits for CREATE_${uppercased}", () => {
		expect(createGen.next().value).toEqual(effects.take(actions.CREATE_${uppercased}));
	});

	// UPDATE
	test("Waits for UPDATE_${uppercased}", () => {
		expect(updateGen.next().value).toEqual(effects.take(actions.UPDATE_${uppercased}));
	});

	// DELETE
	test("Waits for DELETE_${uppercased}", () => {
		expect(removeGen.next().value).toEqual(effects.take(actions.DELETE_${uppercased}));
	});
});
`
}

module.exports = {
	sagaTemplate,
	sagaTestTemplate
}