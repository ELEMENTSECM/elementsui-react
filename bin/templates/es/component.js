const statefulComponentTemplate = (componentName, { container }) =>
	`export class ${componentName}${container ? 'Container' : ''} extends React.Component {
	constructor(props) {
		super(props)

		this.state = {}
	}
	render() {
		return <div className="${componentName.toLowerCase()}" />
	}
}`;

const componentPropsTemplate = (componentName, { stateful, container }) =>
	`${componentName}.propTypes = {
	/** ${componentName} label */
	label: PropTypes.string,
};`;

const statelessComponentTemplate = (componentName, { container }) =>
	`function ${componentName}({ label }) {
	return <div className="${componentName.toLowerCase()}">{label}</div>;
}`;

const exportTemplate = (componentName, { container }) => `export default ${componentName}`;

const componentTemplate = (componentName, { stateful, container }) =>
	`import * as React from 'react';
import PropTypes from 'prop-types';

${
		stateful
			? statefulComponentTemplate(componentName, { container })
			: statelessComponentTemplate(componentName, { container })
	}

${componentPropsTemplate(componentName, { stateful, container })}

${exportTemplate(componentName, { container })}`;

const componentTestTemplate = (componentName, { container }) =>
	`import * as React from 'react';
import { shallow } from 'enzyme';
import ${container ? `{ ${componentName}Container }` : componentName} from './index';

describe('${componentName}', () => {
	test('displays correctly', () => {
		const wrapper = shallow(<${container ? `${componentName}Container` : componentName} />);
		expect(wrapper).toMatchSnapshot();
	});
});`;

const pageTemplate = pageName => `import * as React from 'react';

${componentPropsTemplate(pageName, { stateful: false, container: false })}
function ${pageName}(props) {
	return (
		<div>
			<h1>${pageName}</h1>
			<div className="container">
				page content
			</div>
		</div>
	)
}${exportTemplate(pageName, { container: false })}`;

module.exports = {
	componentTemplate,
	componentTestTemplate,
	pageTemplate
};
