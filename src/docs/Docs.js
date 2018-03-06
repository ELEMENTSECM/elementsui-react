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

	getComponent(name, node = componentData[0]) {
		if (node.name === name || (!name && node.component)) {
			return node.component;
		} else if (node.children.length > 0) {
			let i;
			let result = null;
			for (i = 0; result == null && i < node.children.length; i++) {
				result = this.getComponent(name, node.children[i]);
			}
			return result;
		}

		return null;
	}

	render() {
		const { route } = this.state;
		const component = this.getComponent(route);

		return (
			<div>
				<Navigation components={componentData} />
				<ComponentPage component={component} />
			</div>
		);
	}
}
