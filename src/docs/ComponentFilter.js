import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

const ComponentFilter = ({ onChange }) => {
	return <TextField placeholder="Search..." onChanged={onChange} />;
};

ComponentFilter.propTypes = {
	onChange: PropTypes.func.isRequired
};

export default ComponentFilter;
