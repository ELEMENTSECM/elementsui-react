import React from 'react';
import PropTypes from 'prop-types';
import Example from './Example';
import Props from './Props';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
initializeIcons();

const ComponentPage = ({ component }) => {
	const { name, description, props, examples, relativePath } = component;

	return (
		<div className="componentpage">
			<h2>{name}</h2>
			<p>{description}</p>

			<h3>Example{examples.length > 1 && 's'}</h3>
			{examples.length > 0
				? examples.map(example => (
						<Example
							key={example.code}
							example={example}
							componentName={name}
							path={relativePath}
						/>
				  ))
				: 'No examples exist.'}

			<h3>Props</h3>
			{props ? <Props props={props} /> : 'This component accepts no props.'}
		</div>
	);
};

ComponentPage.propTypes = {
	component: PropTypes.object.isRequired
};

export default ComponentPage;
