import React from 'react';
import { Route } from 'react-router-dom';
import _ from 'lodash';

import Navigation from './Navigation';
import ComponentPage from './ComponentPage';
import componentData from '../../config/componentData';
import DocsOverview from './DocsOverview';

export default class Docs extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			route: window.location.hash.substr(1)
		};
	}

	componentDidMount() {
		window.addEventListener('hashchange', () => {
			this.setState({ route: window.location.hash.substr(1) });
		});
	}

	getTree = components => {
		// TODO: Assuming one level of children for now
		return _.flatMap(components, component => {
			return _.each(component.children, child => {
				return child;
			});
		});
	};

	render() {
		return (
			<div>
				<Navigation components={componentData} />
				<Route exact path="/" component={DocsOverview} />

				{this.getTree(componentData).map(child => {
					const { component } = child;
					return (
						<Route
							key={component.name}
							path={`/${component.name}`}
							render={props => <ComponentPage {...props} component={component} />}
						/>
					);
				})}
			</div>
		);
	}
}
