import * as React from 'react';

export interface PersonaProps {
	/**
	 * Image URL
	 */
	imageUrl?: string;
	/**
	 * Primary text
	 */
	primaryText?: string;
	/**
	 * Secondary text
	 */
	secondaryText?: string;
	/**
	 * Tertiary text
	 */
	tertiaryText?: string;
	/**
	 * Optional text
	 */
	optionalText?: string;
	/**
	 * User-defined styling
	 */
	getStyles?: (...args: any[]) => any;
}

declare const Persona: React.SFC<PersonaProps>;

export default Persona;
