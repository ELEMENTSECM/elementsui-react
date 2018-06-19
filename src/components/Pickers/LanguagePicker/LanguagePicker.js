import * as React from 'react';
import PropTypes from 'prop-types';
import { styles } from './LanguagePicker.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';
import Dropdown from '../../Inputs/Dropdown';
import codes from './LanguagePicker.codes.json';

export function LanguagePicker(props) {
	const { id, languageCodes, defaultLanguage, onChange, styles } = props;
	const classNames = classNamesFunction()(styles, props);

	const dropdownOptions = languageCodes.map(code => {
		return {
			key: code,
			text: (codes[code] && codes[code].name) || code,
			isSelected: code === defaultLanguage
		};
	});

	return (
		<div className={classNames.root}>
			<Dropdown id={id} options={dropdownOptions} onChange={option => onChange(option.key)} />
		</div>
	);
}

LanguagePicker.propTypes = {
	/** HTML id tag of the root element */
	id: PropTypes.string,
	/** The list of available 2-letter language codes */
	languageCodes: PropTypes.arrayOf(PropTypes.string).isRequired,
	/** Default language 2-letter language code */
	defaultLanguage: PropTypes.string,
	/** Value changed event handler */
	onChange: PropTypes.func
};

export default styled(customizable('LanguagePicker', ['theme'])(LanguagePicker), styles);
