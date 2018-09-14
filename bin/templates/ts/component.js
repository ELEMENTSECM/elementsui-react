const statefulComponentTemplate = (componentName) =>
	`export class ${componentName} extends React.Component<${componentName}.Props, ${componentName}.State> {
	constructor(props: any) {
		super(props);

		this.state = {};
	}

	render() {
		return <div className="${componentName.toLowerCase()}" />;
	}
}`;

const componentPropsTemplate = (componentName, { stateful }) =>
	`export namespace ${componentName} {
	export interface Props {
		foo?: string;
	}
${
	stateful
		? `
	export interface State {}`
		: ""
	}
}
`;

const statelessComponentTemplate = (componentName) =>
	`const ${componentName}: React.SFC<${componentName}.Props> = props => {
	return <div className="${componentName.toLowerCase()}" />;
}`;

const componentTemplate = (componentName, { stateful }) =>
	`import * as React from "react";

${componentPropsTemplate(componentName, { stateful })}
${
	stateful
		? statefulComponentTemplate(componentName)
		: statelessComponentTemplate(componentName)
	}
	
export default ${componentName};`;

const componentTestTemplate = (componentName) =>
	`import * as React from "react";
import { shallow } from "enzyme";
import ${componentName} from "./index";

test("renders as expected", () => {
	const component = shallow(<${componentName} />);
	expect(component).toMatchSnapshot();
});`;

const pageTemplate = pageName => `import * as React from "react"

${componentPropsTemplate(pageName, { stateful: false })}
const ${pageName}: React.SFC<${pageName}.Props> = props => {
	return (
		<div>
			<h1>${pageName}</h1>
			<div className="container">
				page content
			</div>
		</div>
	);
}

export default ${componentName};`;

module.exports = {
	componentTemplate,
	componentTestTemplate,
	pageTemplate
};
