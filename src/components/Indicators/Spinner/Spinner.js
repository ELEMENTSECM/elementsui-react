import React from 'react';
import PropTypes from 'prop-types';
import { Spinner as UiFabSpinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';

/** Spinner example */
function Spinner({ label }) {
	return <UiFabSpinner label={label} size={SpinnerSize.large} />;
}

Spinner.propTypes = {
	/** Spinner label */
	label: PropTypes.string
};

export default Spinner;
