import React from 'react';
import Navigation from './Navigation';
import ComponentPage from './ComponentPage';
import componentData from '../../config/componentData';
import DocsOverview from './DocsOverview';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

const Child = ({ match }) => (
	<div>
		<h3>ID: {match.params.id}</h3>
	</div>
);

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

	getComponents(node = componentData[0]) {
		if (node.component) {
			return node.component;
		} else if (node.children.length > 0) {
			return node.children.map(x => this.getComponents(x));
		}

		return null;
	}

	render() {
		// return (
		// 	<div>
		// 		<h2>Accounts</h2>
		// 		<ul>
		// 			<li>
		// 				<Link to="/netflix">Netflix</Link>
		// 			</li>
		// 			<li>
		// 				<Link to="/zillow-group">Zillow Group</Link>
		// 			</li>
		// 			<li>
		// 				<Link to="/yahoo">Yahoo</Link>
		// 			</li>
		// 			<li>
		// 				<Link to="/modus-create">Modus Create</Link>
		// 			</li>
		// 		</ul>
		// 		<Route path="/:id" component={Child} />
		// 	</div>
		// );
		const { route } = this.state;
		const component = route && this.getComponents().filter(x => x.name === route)[0];

		return (
			<div>
				<Navigation components={componentData} />
				<Route exact path="/" component={DocsOverview} />
				{this.getComponents().map(component => {
					return <Route path={`/${component.name}`} component={ComponentPage} />;
				})}
			</div>
		);
	}
}
