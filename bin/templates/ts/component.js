const statefulComponentTemplate = (componentName, { container }) =>
	`export class ${componentName}${
		container ? 'Container' : ''
	} extends Component<${componentName}.Props, ${componentName}.State> {
	constructor(props: any) {
		super(props)

		this.state = {}
	}
	render() {
		return <div className="${componentName.toLowerCase()}" />
	}
}`

const componentPropsTemplate = (componentName, { stateful, container }) =>
	`export namespace ${componentName} {
	export interface Props {
		foo?: string${
			container
				? `
		actions?: DummyActions // TODO replace with real actions (${componentName}Actions etc)
`
				: ``
		}
	}${
		stateful
			? `
	export interface State {}`
			: ''
	}
}
`

const statelessComponentTemplate = (componentName, { container }) =>
	`const ${componentName}: React.SFC<${componentName}.Props> = props => {
	return <div className="${componentName.toLowerCase()}" />
}`

const exportTemplate = (componentName, { container }) =>
	container
		? `

export const ${componentName} = connect(
	(
		state: RootState
	): PartialPick<${componentName}.Props, 'foo'> => {
		return { foo: '' }
	},
	(dispatch: Dispatch<RootState>): Pick<${componentName}.Props, 'actions'> => ({
		actions: bindActionCreators(omit(DummyActions, 'Type'), dispatch)
	})
)<${componentName}.Props>(${componentName}Container)`
		: `

export default ${componentName}`

const componentTemplate = (componentName, { stateful, container }) =>
	`import React${stateful ? ', { Component }' : ''} from 'react'${
		container
			? `
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { RootState } from 'store/state'
import { omit } from 'utils'
import { DummyActions } from 'actions' // TODO: import { ${componentName}Actions } from 'actions'
`
			: `
`
	}
${componentPropsTemplate(componentName, { stateful, container })}
${
		stateful
			? statefulComponentTemplate(componentName, { container })
			: statelessComponentTemplate(componentName, { container })
	}${exportTemplate(componentName, { container })}`

const componentTestTemplate = (componentName, { container }) =>
	`import React from 'react'
import { shallow } from 'enzyme'
import ${container ? `{ ${componentName}Container }` : componentName} from './index'

test('renders as expected', () => {
	const component = shallow(<${container ? `${componentName}Container` : componentName} />)
	expect(component).toMatchSnapshot()
})`

const pageTemplate = pageName => `import * as React from 'react'

${componentPropsTemplate(pageName, { stateful: false, container: false })}
const ${pageName}Page: React.SFC<${pageName}.Props> = props => {
	return (
		<div>
			<h1>${pageName}</h1>
			<div className="container">
				page content
			</div>
		</div>
	)
}${exportTemplate(pageName, { container: false })}`

module.exports = {
	componentTemplate,
	componentTestTemplate,
	pageTemplate
}
