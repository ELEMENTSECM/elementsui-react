import * as React from 'react';
import PropTypes from 'prop-types';
import ComponentFilter from './ComponentFilter';
import TreeView from 'react-treeview';

class Navigation extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			components: this.props.components
		};
	}

	filterComponents = filter => {
		this.setState({
			components: getComponents(filter, this.props.components)
		});
	};

	getTree() {
		return this.state.components.map((node, i) => {
			if (node) {
				const name = node.name;
				const hasChildren = node.children && node.children.length;

				const label = hasChildren ? (
					<span className="node">{name}</span>
				) : (
					<li className="component-link" key={name}>
						<a href={`#${name}`}>
							<span className="node">{name}</span>
						</a>
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
	}

	render() {
		return (
			<div className="left-menu">
				<ComponentFilter onChange={this.filterComponents} />
				{this.getTree()}
			</div>
		);
	}
}

Navigation.propTypes = {
	components: PropTypes.array.isRequired
};

function getComponents(name, node) {
	return node.filter(function(o) {
		const match = o.name.toLowerCase().indexOf(name.toLowerCase()) !== -1;
		if (o.children && o.children.length > 0) {
			if (!match) {
				o.children = getComponents(name, o.children);
			}
			if (o.children.length > 0) {
				return true;
			}
		}
		return match;
	});
}

export default Navigation;
