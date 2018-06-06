import * as React from 'react';
import PropTypes from 'prop-types';
import { Dropdown as UIFabDropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { styles } from './Dropdown.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';

/** Dropdown example */
export function Dropdown(props) {
	const { htmlId, id, label, selectedKey, placeHolder, options, onChange, styles } = props;
	const classNames = classNamesFunction()(styles, props);
	return (
		<UIFabDropdown
			htmlId={htmlId}
			id={id}
			label={label}
			selectedKey={selectedKey}
			placeHolder={placeHolder}
			options={options}
			onChanged={onChange}
			className={classNames.root}
		/>
	);
}

Dropdown.propTypes = {
	/** HTML id tag of the root element */
	htmlId: PropTypes.string,
	/** Dropdown label */
	label: PropTypes.string,
	/** The key of the selected element */
	selectedKey: PropTypes.any,
	/** Default placeholder */
	placeHolder: PropTypes.string,
	/** Dropdown options */
	options: PropTypes.arrayOf(
		PropTypes.shape({
			/** Option key value */
			key: PropTypes.any.isRequired,
			/** Option text value */
			text: PropTypes.string.isRequired,
			/** Option is selected */
			isSelected: PropTypes.bool
		})
	).isRequired,
	/** onChange event handler function */
	onChange: PropTypes.func,
	/** User-defined styling */
	styles: PropTypes.func
};

export default styled(customizable('Dropdown', ['theme'])(Dropdown), styles);
