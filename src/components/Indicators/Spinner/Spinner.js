import * as React from 'react';
import PropTypes from 'prop-types';
import ClipLoader from "react-spinners/ClipLoader";
import {styles} from "./Spinner.styles";

/** Spinner example */
export default function Spinner(props) {
	return <div className={styles.spinner}>
		<ClipLoader {...props} color="#2180c0" />
		{ props.label && <div className={styles.spinnerLabel}>{props.label}</div> }
	</div>;
}

Spinner.propTypes = {
	/** HTML id tag of the root element */
	id: PropTypes.string,
	/** Spinner size */
	size: PropTypes.number,
	/** Spinner size units */
	sizeUnit: PropTypes.string,
	/** Spinner state */
	loading: PropTypes.bool,
	/** Spinner label */
	label: PropTypes.string
};
