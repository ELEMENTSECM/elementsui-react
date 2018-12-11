import React from "react";
import PropTypes from "prop-types";
import CodeExample from "./CodeExample";
import Button from "react-bootstrap/lib/Button";

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
				<ExampleComponent />
				<p>
					<Button onClick={this.toggleCode} style={{ marginTop: 20 }}>{`${showCode
						? "Hide"
						: "Show"} Code`}</Button>
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
