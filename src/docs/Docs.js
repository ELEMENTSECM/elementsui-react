import React from 'react';
import { Route, Switch } from 'react-router-dom';
import _ from 'lodash';

import Navigation from './Navigation';
import ComponentPage from './ComponentPage';
import componentData from '../../config/componentData';
import DocsOverview from './DocsOverview';
import NoMatch from './NoMatch';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';


export default class Docs extends React.Component {
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
			<Fabric>
					<header>
						<h1 className={"pageheader"}><span className="logo"></span><span className="logo-title">ElementsUI</span></h1>
					</header>
					<main>
						<Navigation components={componentData} />
			
				<Switch>
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
					<Route component={NoMatch} />
				</Switch>
				</main>
			</Fabric>
		);
	}
}
