const actionTemplate = actionName => `import { createAction } from 'redux-actions'
import { ${actionName}Model } from 'models/${actionName}Model'

export namespace ${actionName}Actions {
	export enum Type {
		FOO_SUCCESS = 'FOO_SUCCESS'
	}

	export const fooSuccess = createAction<${actionName}Model>(Type.FOO_SUCCESS)
}

export type ${actionName}Actions = Omit<typeof ${actionName}Actions, 'Type'>`

const actionTestTemplate = actionName => `import { ${actionName}Actions } from './index'

describe('[Actions] ${actionName}Actions', () => {
	it('[fooSuccess] should return FOO_SUCCESS with payload', () => {
		const action = ${actionName}Actions.fooSuccess({foo: 'bar'})
		expect(action.type === ${actionName}Actions.Type.FOO_SUCCESS).toBeTruthy()
		expect(action.payload.foo).toBe('bar')
	})
})`

module.exports = {
	actionTemplate,
	actionTestTemplate
}
