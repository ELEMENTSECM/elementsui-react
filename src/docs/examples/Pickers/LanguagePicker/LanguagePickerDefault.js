import * as React from 'react';
import LanguagePicker from 'elementsui-react/Pickers/LanguagePicker';

const items = ['en', 'nb', 'nn', 'sv'];

/** LanguagePicker default */
export default function LanguagePickerDefault() {
	return (
		<LanguagePicker
			id="basePicker"
			languageCodes={items}
			defaultLanguage="en"
			onChange={lang => alert(`${lang} is selected`)}
		/>
	);
}
