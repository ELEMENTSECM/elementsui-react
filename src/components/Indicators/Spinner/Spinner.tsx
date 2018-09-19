import * as React from "react";
import { styles } from "./Spinner.styles";

export interface ISpinnerProps {
	/**
	 * HTML id tag of the root element
	 */
	id?: string;
	/**
	 * Spinner size
	 */
	size?: number;
	/**
	 * Spinner size units
	 */
	sizeUnit?: string;
	/**
	 * Spinner state
	 */
	loading?: boolean;
	/**
	 * Spinner label
	 */
	label?: string;
}

const Spinner: React.SFC<ISpinnerProps> = (props) => (
	<div className={styles.spinner}>
		<div {...props} color="#2180c0" />
		{props.label && <div className={styles.spinnerLabel}>{props.label}</div>}
	</div>
);

export default Spinner;
