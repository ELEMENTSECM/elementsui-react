const actionTemplate = resourceName => {
	const uppercased = resourceName.toUpperCase();
	return `import { ActionCreator } from "redux";
import { FSA, createPayload, INormalizedPayload } from "../index";
import { ${resourceName} } from "../../store/models";

export const GET_${uppercased} = "GET_${uppercased}";
export const SET_${uppercased} = "SET_${uppercased}";

export const CREATE_${uppercased} = "CREATE_${uppercased}";
export const CREATE_${uppercased}_SUCCESS = "CREATE_${uppercased}_SUCCESS";

export const UPDATE_${uppercased} = "UPDATE_${uppercased}";
export const UPDATE_${uppercased}_SUCCESS = "UPDATE_${uppercased}_SUCCESS";

export const DELETE_${uppercased} = "DELETE_${uppercased}";
export const DELETE_${uppercased}_SUCCESS = "DELETE_${uppercased}_SUCCESS";

export interface Get${resourceName}Action extends FSA<string> {}
export interface Set${resourceName}Action extends FSA<INormalizedPayload> {}

export interface Save${resourceName}Action extends FSA<${resourceName}> {}
export interface Save${resourceName}SuccessAction extends FSA<${resourceName}> {}

export interface Delete${resourceName}Action extends FSA<${resourceName}> {}
export interface Delete${resourceName}SuccessAction extends FSA<any> {}

export type ${resourceName}Actions =
	| Get${resourceName}Action
	| Set${resourceName}Action
	| Save${resourceName}Action
	| Save${resourceName}SuccessAction
	| Delete${resourceName}Action
	| Delete${resourceName}SuccessAction;

export const get${resourceName}: ActionCreator<Get${resourceName}Action> = (id: string) =>
	createPayload(GET_${uppercased}, id, {
		onSuccess: (value: INormalizedPayload) => createPayload(SET_${uppercased}, value)
	});

export const create${resourceName}: ActionCreator<Save${resourceName}Action> = (entity: ${resourceName}) =>
	createPayload(CREATE_${uppercased}, entity, {
		onSuccess: (value: INormalizedPayload) => createPayload(CREATE_${uppercased}_SUCCESS, value)
	});

export const update${resourceName}: ActionCreator<Save${resourceName}Action> = (entity: ${resourceName}) =>
	createPayload(UPDATE_${uppercased}, entity, {
		onSuccess: (value: INormalizedPayload) => createPayload(UPDATE_${uppercased}_SUCCESS, value)
	});

export const delete${resourceName}: ActionCreator<Delete${resourceName}Action> = (entity: ${resourceName}) =>
	createPayload(DELETE_${uppercased}, entity, {
		onSuccess: (id: string | number) => createPayload(DELETE_${uppercased}_SUCCESS, id)
	});

export default {
	get${resourceName},
	create${resourceName},
	update${resourceName},
	delete${resourceName},
	GET_${uppercased}, 
	SET_${uppercased},
	CREATE_${uppercased},
	CREATE_${uppercased}_SUCCESS,
	UPDATE_${uppercased},
	UPDATE_${uppercased}_SUCCESS,
	DELETE_${uppercased},
	DELETE_${uppercased}_SUCCESS
};`}

const actionTestTemplate = resourceName => {
	const uppercased = resourceName.toUpperCase();
	return `import ${resourceName}Actions from "./${resourceName}Actions";

describe("[Actions] ${resourceName}Actions", () => {
	const entity = { Id: 1 };

	test("[get${resourceName}] should return GET_${uppercased} with payload", () => {
		const action = ${resourceName}Actions.get${resourceName}("1");
		const successAction = action.meta.onSuccess("test");
		expect(action.type).toBe(${resourceName}Actions.GET_${uppercased});
		expect(action.payload).toBe("1");
		expect(successAction.type).toBe(${resourceName}Actions.SET_${uppercased});
		expect(successAction.payload).toBe("test");
	});

	test("[create${resourceName}] should return CREATE_${uppercased} with payload", () => {
		const action = ${resourceName}Actions.create${resourceName}(entity);
		const successAction = action.meta.onSuccess("test");
		expect(action.type).toBe(${resourceName}Actions.CREATE_${uppercased});
		expect(action.payload).toEqual(entity);
		expect(successAction.type).toBe(${resourceName}Actions.CREATE_${uppercased}_SUCCESS);
		expect(successAction.payload).toBe("test");
	});

	test("[update${resourceName}] should return UPDATE_${uppercased} with payload", () => {
		const action = ${resourceName}Actions.update${resourceName}(entity);
		const successAction = action.meta.onSuccess("test");
		expect(action.type).toBe(${resourceName}Actions.UPDATE_${uppercased});
		expect(action.payload).toEqual(entity);
		expect(successAction.type).toBe(${resourceName}Actions.UPDATE_${uppercased}_SUCCESS);
		expect(successAction.payload).toBe("test");
	});

	test("[delete${resourceName}] should return DELETE_${uppercased} with payload", () => {
		const action = ${resourceName}Actions.delete${resourceName}(entity);
		const successAction = action.meta.onSuccess("test");
		expect(action.type).toBe(${resourceName}Actions.DELETE_${uppercased});
		expect(action.payload).toEqual(entity);
		expect(successAction.type).toBe(${resourceName}Actions.DELETE_${uppercased}_SUCCESS);
		expect(successAction.payload).toBe("test");
	});
})`};

module.exports = {
	actionTemplate,
	actionTestTemplate
}
