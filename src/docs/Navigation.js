import * as React from 'react';
import PropTypes from 'prop-types';
import ComponentFilter from './ComponentFilter';
import TreeView from 'react-treeview';
import { Link } from 'react-router-dom';

class Navigation extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			components: this.props.components
		};
	}

	filterComponents(filter) {
		const filtered = filter
			? this.getComponents(filter, this.props.components[0])
			: this.props.components;
		this.setState({
			components: filtered
		});
	}

	getComponents = (name, node) => {
		if (node.name.toLowerCase().indexOf(name.toLowerCase()) !== -1) {
			return node.component;
		} else if (node.children.length > 0) {
			return node.children.map(x => this.getComponents(name, x));
		}

		return null;
	};

	getTree = components => {
		if (!components) {
			components = this.props.components;
		}
		return components.map((node, i) => {
			if (node) {
				const name = node.name;
				const hasChildren = node.children && node.children.length;

				const label = hasChildren ? (
					<span className="node">{name}</span>
				) : (
					<li className="component-link" key={name}>
						<Link to={name} className="node">
							{name}
						</Link>
					</li>
				);

				return !hasChildren ? (
					label
				) : (
					<TreeView key={name + '|' + i} nodeLabel={label} defaultCollapsed={!hasChildren}>
						{hasChildren ? this.getTree(node.children) : ''}
					</TreeView>
				);
			}

			return '';
		});
	};

	render() {
		return (
			<div className="left-menu">
				<ComponentFilter onChange={this.filterComponents.bind(this)} />
				<Link to="/">ElementsUI</Link>
				{this.getTree(this.state.components)}
			</div>
		);
	}
}

Navigation.propTypes = {
	components: PropTypes.array.isRequired
};

export default Navigation;
