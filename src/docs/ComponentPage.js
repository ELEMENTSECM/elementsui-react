import React from 'react';
import PropTypes from 'prop-types';
import Example from './Example';
import Props from './Props';


const ComponentPage = ({ component }) => {
	const { name, description, props, examples, relativePath } = component;

	return (
		<article className={"article-content"}>
			<h2 className="components-header">{name}</h2>
			<p>{description}</p>

			<h3 className="component-example-header">Example{examples.length > 1 && 's'}</h3>
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

			<h3 className="component-properties-header">Props</h3>
			{props ? <Props props={props} /> : 'This component accepts no props.'}
		</article>
	);
};

ComponentPage.propTypes = {
	component: PropTypes.object.isRequired
};

export default ComponentPage;
