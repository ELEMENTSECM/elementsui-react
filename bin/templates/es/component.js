const statefulComponentTemplate = (componentName, { container, styled }) =>
	`export class ${componentName}${container ? 'Container' : ''} extends React.Component {
	constructor(props) {
		super(props)

		this.state = {}${
			styled
				? `
		this.classNames = classNamesFunction()(styles, this.props);`
				: ''
		}
	}

	render() {
		return <div className=${styled ? '{this.classNames.root}' : '"' + componentName.toLowerCase() + '"'} />;
	}
}`;

const componentPropsTemplate = (componentName, { stateful, container, styled }) =>
	`${componentName}.propTypes = {
	${
		styled
			? `/** Class name */
	className: PropTypes.string,`
			: ''
	}
	/** ${componentName} label */
	label: PropTypes.string,
};`;

const statelessComponentTemplate = (componentName, { container, styled }) =>
	`${styled ? 'export ' : ''}function ${componentName}(props) {
	const { styles, label } = props;
	const classNames = classNamesFunction()(styles, props);
	return <div className=${styled ? '{classNames.root}' : '"' + componentName.toLowerCase() + '"'}>{label}</div>;
};`;

const exportTemplate = (componentName, { container, styled }) =>
	`export default ${
		styled
			? `styled(customizable(\'${componentName}\', [\'theme\'])(${componentName}), styles);`
			: componentName
	};`;

const componentTemplate = (componentName, { stateful, container, styled }) =>
	`import * as React from 'react';
import PropTypes from 'prop-types';
import { styles } from './${componentName}.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';

${
		stateful
			? statefulComponentTemplate(componentName, { container, styled })
			: statelessComponentTemplate(componentName, { container, styled })
	}

${componentPropsTemplate(componentName, { stateful, container, styled })}

${exportTemplate(componentName, { container, styled })}`;

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

const componentStyleTemplate = componentName => `export const styles = props => {
	const { className, theme } = props;
	const { palette, semanticColors } = theme;

	return {
		root: [
			'ms-${componentName}',
			{
				// background: props.theme.palette.themePrimary
				// place your styles here
			},
			className
		]
	};
};
`;

module.exports = {
	componentTemplate,
	componentTestTemplate,
	componentStyleTemplate,
	pageTemplate
};
