import React from 'react';
import Navigation from './Navigation';
import ComponentPage from './ComponentPage';
import componentData from '../../config/componentData';

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
		const { route } = this.state;
		const component = route
			? this.getComponents().filter(x => x.name === route)[0]
			: this.getComponents()[0];

		return (
			<div>
				<Navigation components={componentData} />
				<ComponentPage component={component} />
			</div>
		);
	}
}
