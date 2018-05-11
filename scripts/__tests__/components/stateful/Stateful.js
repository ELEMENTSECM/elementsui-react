import * as React from 'react';
import PropTypes from 'prop-types';

class Stateful extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return <div />;
	}
}

Stateful.propTypes = {
	/** Stateful label */
	label: PropTypes.string
};

export default Stateful;
