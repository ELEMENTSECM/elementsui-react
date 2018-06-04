import * as React from 'react';
import PropTypes from 'prop-types';
import { getStyles } from './Persona.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';
import { Persona as FABPersona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';

export function Persona(props) {
	const { getStyles } = props;
	const classNames = classNamesFunction()(getStyles, props);

	let initials = props.primaryText.match(/\b\w/g) || [];
	initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();

	return (
		<FABPersona
			className={classNames.root}
			size={PersonaSize.size40}
			imageInitials={initials}
			{...props}
		/>
	);
}

Persona.propTypes = {
	/** Image URL */
	imageUrl: PropTypes.string,
	/** Primary text */
	primaryText: PropTypes.string,
	/** Secondary text */
	secondaryText: PropTypes.string,
	/** Tertiary text */
	tertiaryText: PropTypes.string,
	/** Optional text */
	optionalText: PropTypes.string,
	/** Primary text color */
	primaryTextColor: PropTypes.string,
	/** Secondary text color */
	secondaryTextColor: PropTypes.string,
	/** Tertiary text color */
	tertiaryTextColor: PropTypes.string,
	/** Optional text color */
	optionalTextColor: PropTypes.string,
	/** User-defined styling */
	getStyles: PropTypes.func
};

export default styled(customizable('Persona', ['theme'])(Persona), getStyles);
