import * as React from 'react';

export interface LanguagePickerProps {
	/**
	 * HTML id tag of the root element
	 */
	id?: string;
	/**
	 * The list of available 2-letter language codes
	 */
	languageCodes: string[];
	/**
	 * Default language 2-letter language code
	 */
	defaultLanguage?: string;
	/**
	 * Value changed event handler
	 */
	onChange?: (...args: any[]) => any;
}

declare const LanguagePicker: React.SFC<LanguagePickerProps>;

export default LanguagePicker;
