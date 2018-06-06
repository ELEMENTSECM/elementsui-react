import * as React from 'react';
import PropTypes from 'prop-types';
import { Spinner as UiFabSpinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { styles } from './Spinner.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';

/** Spinner example */
export function Spinner(props) {
	const { id, label, styles } = props;
	const classNames = classNamesFunction()(styles, props);
	return <UiFabSpinner id={id} className={classNames.root} label={label} size={SpinnerSize.large} />;
}

Spinner.propTypes = {
	/** HTML id tag of the root element */
	id: PropTypes.string,
	/** Spinner label */
	label: PropTypes.string,
	/** User-defined styling */
	styles: PropTypes.func
};

export default styled(customizable('Spinner', ['theme'])(Spinner), styles);
