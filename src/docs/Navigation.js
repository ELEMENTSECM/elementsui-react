import * as React from 'react';
import PropTypes from 'prop-types';
import ComponentFilter from './ComponentFilter';

class Navigation extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			components: this.props.components
		};
	}

	filterComponents = filter => {
		this.setState({
			components: this.props.components.filter(
				x => x.toLowerCase().indexOf(filter.toLowerCase()) !== -1
			)
		});
	};

	render() {
		return (
			<div className="left-menu">
				<ComponentFilter onChange={this.filterComponents} />
				<ul className="navigation">
					{this.state.components.map(name => {
						return (
							<li key={name}>
								<a href={`#${name}`}>{name}</a>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}

Navigation.propTypes = {
	components: PropTypes.array.isRequired
};

export default Navigation;
