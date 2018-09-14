const utils = require("../../utils");
const reducerTemplate = name => {
	const uppercased = name.toUpperCase();
	const camelCased = utils.camelCase(name);
	return `import { Reducer } from "redux";
import { ${name} } from "../../store/models";
import {
	${name}Actions,
	SET_${uppercased},
	CREATE_${uppercased}_SUCCESS,
	UPDATE_${uppercased}_SUCCESS
} from "../../actions/${name}/${name}Actions";
import { IRootState } from "../../store";
import { createMetadataSelector } from "../../store/selectors";

const ${name}Reducer: Reducer<{ [id: string]: ${name} }> = (state = {}, action: ${name}Actions) => {
	switch (action.type) {
		case SET_${uppercased}:
		case CREATE_${uppercased}_SUCCESS:
		case UPDATE_${uppercased}_SUCCESS:
			return _.merge({}, state, action.payload.entities.${camelCased}s);
		default:
			return state;
	}
};
	
export const ${camelCased}s = (state: IRootState) => state.models.${camelCased}s;
export const ${camelCased}Meta = createMetadataSelector<${name}, string>(${camelCased}s, [ "Id", "Description" ]);
export default ${name}Reducer;
`;
}

const reducerTestTemplate = name => {
	const uppercased = name.toUpperCase();
	const camelCased = utils.camelCase(name);
	return `import ${name}Reducer from "./${name}Reducer";
import { SET_${uppercased} } from "../../actions/${name}/${name}Actions";

describe("${name}Reducer", () => {
	test("SET_${uppercased} - store should contain new entity", () => {
		const action = {
			type: SET_${uppercased},
			payload: {
				entities: {
					${camelCased}s: {
						1: {
							Id: 1
						}
					}
				}
			}
		}

		const state = ${name}Reducer(undefined, action);
		expect(state[1]).toEqual({ Id: 1 });
	});
});`;
}

module.exports = {
	reducerTemplate,
	reducerTestTemplate
}
