import * as React from 'react';
import PropTypes from 'prop-types';
import { Spinner as UiFabSpinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { getStyles } from './Spinner.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';

/** Spinner example */
export function Spinner({ label, className, theme }) {
	const classNames = classNamesFunction()(getStyles, {
		theme,
		className
	});
	return <UiFabSpinner className={classNames.root} label={label} size={SpinnerSize.large} />;
}

Spinner.propTypes = {
	/** Spinner label */
	label: PropTypes.string
};

export default styled(customizable('Spinner', ['theme'])(Spinner), getStyles);
