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
	 * Primary text color
	 */
	primaryTextColor?: string;
	/**
	 * Secondary text color
	 */
	secondaryTextColor?: string;
	/**
	 * Tertiary text color
	 */
	tertiaryTextColor?: string;
	/**
	 * Optional text color
	 */
	optionalTextColor?: string;
	/**
	 * User-defined styling
	 */
	getStyles?: (...args: any[]) => any;
}

declare const Persona: React.SFC<PersonaProps>;

export default Persona;
