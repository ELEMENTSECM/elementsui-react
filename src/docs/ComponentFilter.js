import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, InputGroup } from 'react-bootstrap';

const ComponentFilter = ({ onChange }) => {
	return <FormGroup>
		<InputGroup.Addon>Search</InputGroup.Addon>
		<FormControl type="text" placeholder="Search" onChange={onChange} />
	</FormGroup>
};

ComponentFilter.propTypes = {
	onChange: PropTypes.func.isRequired
};

export default ComponentFilter;
