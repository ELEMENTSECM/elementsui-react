import React from 'react';
import PropTypes from 'prop-types';
import CodeExample from './CodeExample';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';

class Example extends React.Component {
	constructor(props) {
		super(props);
		this.state = { showCode: false };
	}

	toggleCode = event => {
		event.preventDefault();
		this.setState(prevState => {
			return { showCode: !prevState.showCode };
		});
	};

	render() {
		const { showCode } = this.state;
		const { code, description, name } = this.props.example;
		// Must use CommonJS require to dynamically require because ES Modules must be statically analyzable.
		const ExampleComponent = require(`./examples/${this.props.path}/${name}`).default;
		return (
			<div className="example">
				{description && <h4>{description}</h4>}
				{/* Wrap example component in <Fabric> to enable proper focusing, styles etc.*/}
				<Fabric>
					<ExampleComponent />
				</Fabric>
				<p>
					<button href="" onClick={this.toggleCode}>
						{showCode ? 'Hide' : 'Show'} Code
					</button>
				</p>

				{showCode && <CodeExample>{code}</CodeExample>}
			</div>
		);
	}
}

Example.propTypes = {
	example: PropTypes.object.isRequired,
	componentName: PropTypes.string.isRequired,
	path: PropTypes.string.isRequired
};

export default Example;
