import * as React from 'react';
import PropTypes from 'prop-types';
import { Checkbox as UIFabCheckbox } from 'office-ui-fabric-react/lib/Checkbox';
import { getStyles } from './Checkbox.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';

/** Checkbox example */
export function Checkbox({ label, disabled, getStyles, className, theme }) {
	const classNames = classNamesFunction()(getStyles, {
		theme,
		className
	});
	return (
		<UIFabCheckbox
			className={classNames.root}
			label={label}
			disabled={disabled}
			ariaDescribedBy={'descriptionID'}
		/>
	);
}

Checkbox.propTypes = {
	/** Checkbox label */
	label: PropTypes.string,
	/** Checkbox is disabled */
	disabled: PropTypes.bool,
	/** Checkbox description */
	ariaDescribedBy: PropTypes.string
};

export default styled(customizable('Checkbox', ['theme'])(Checkbox), getStyles);
