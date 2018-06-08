import * as React from 'react';
import LanguagePicker from 'elementsui-react/Pickers/LanguagePicker';

const items = ['en', 'nb', 'nn', 'sv'];

/** LanguagePicker styled */
export default function LanguagePickerStyled() {
	const styles = () => {
		return {
			'some-class': {
				background: 'inherit',
				color: 'inherit'
			}
		};
	};
	const languagePickerStyled = {
		id: 'basePickerStyled',
		languageCodes: items,
		defaultLanguage: 'en',
		onChange(lang) {
			alert(`${lang} is selected`);
		},
		styles,
		className: 'sign-in-languagepicker'
	};
	return <LanguagePicker {...languagePickerStyled} />;
}
