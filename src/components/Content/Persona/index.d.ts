import * as React from 'react';

export interface PersonaProps {
	/**
	 * HTML id tag of the root element
	 */
	htmlId?: string;
	/**
	 * Image URL
	 */
	imageUrl?: string;
	/**
	 * Primary text
	 */
	text?: string;
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
	styles?: (...args: any[]) => any;
}

declare const Persona: React.SFC<PersonaProps>;

export default Persona;
