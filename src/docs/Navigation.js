import * as React from 'react';
import PropTypes from 'prop-types';
//import ComponentFilter from './ComponentFilter';
import TreeView from 'react-treeview';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import {FormGroup, FormControl} from "react-bootstrap";

class Navigation extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			components: this.props.components
		};
	}

	filterComponents = (e) => {
		const filter = e.target.value;
		const filtered = filter ? this.getComponents(filter, this.props.components) : this.props.components;
		this.setState({
			components: filtered
		});
	}

	getComponents = (name, node) => {
		let nodeArray = _.flatMap(node, node => {
			return node.children;
		});

		return _.map(nodeArray, comp => {
			if (_.includes(_.toLower(comp.name), _.toLower(name))) {
				return comp;
			}
		});
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
						{hasChildren ? <ul>{this.getTree(node.children)}</ul> : ''}
					</TreeView>
				);
			}

			return '';
		});
	};

	render() {
		return (
			<div className="search-nav">
			<FormGroup>
				<FormControl type="text" className="component-search" placeholder="Search" onChange={this.filterComponents}/>
			</FormGroup>
				<nav className="navigation-menu">{this.getTree(this.state.components)}</nav>
			</div>
		);
	}
}

Navigation.propTypes = {
	components: PropTypes.array.isRequired
};

export default Navigation;
