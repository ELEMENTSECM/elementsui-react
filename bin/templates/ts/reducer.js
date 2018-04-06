const reducerTemplate = name => `import { handleActions } from 'redux-actions'
import { RootState } from 'store/state'
import { ${name}Actions } from 'actions/${name}'
import { ${name}Model } from 'models/${name}Model'

const initialState: RootState.${name}State = {}

export const ${name}Reducer = handleActions<RootState.${name}State, ${name}Model>(
	{
		[${name}Actions.Type.FOO_SUCCESS]: (state, action) => {
			if (action.payload) {
				return {
					foo: action.payload.foo
				}
			} else {
				return state
			}
		}
	},
	initialState
)
`

const reducerTestTemplate = name => `import { ${name}Reducer } from './index'
import { ${name}Actions } from 'actions/${name}'
import { ${name}Model } from 'models/${name}Model'

describe('[Reducers] ${name}Reducer', () => {
	const initialState = {}
	const modifiedState = {
		foo: 'bar'
	}

	const fooSuccess = {
		type: ${name}Actions.Type.FOO_SUCCESS,
		payload: modifiedState
	}

	it('[${name}Reducer.FOO_SUCCESS] should return state with foo', () => {
		const stateFooSuccess = ${name}Reducer(initialState, fooSuccess)
		expect(stateFooSuccess.foo).toBe('bar')
	})
})
`

module.exports = {
	reducerTemplate,
	reducerTestTemplate
}
