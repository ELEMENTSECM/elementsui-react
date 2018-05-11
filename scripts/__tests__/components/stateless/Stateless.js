import * as React from 'react';
import PropTypes from 'prop-types';

export function Stateless(props) {
	const { label } = props;
	return <div>{label}</div>;
}

Stateless.propTypes = {
	/** Stateless label */
	label: PropTypes.string
};

export default Stateless;
