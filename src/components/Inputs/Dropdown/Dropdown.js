import * as React from 'react';
import PropTypes from 'prop-types';
import { Dropdown as UIFabDropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { styles } from './Dropdown.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';

/** Dropdown example */
export function Dropdown(props) {
	const {
		id,
		label,
		selectedKey,
		placeHolder,
		options,
		onChange,
		onDismiss,
		onRenderOption,
		onRenderPlaceHolder,
		onRenderTitle,
		onRenderCaretDown,
		dropdownWidth,
		responsiveMode,
		multiSelect,
		defaultSelectedKeys,
		selectedKeys,
		multiSelectDelimiter,
		styles
	} = props;
	const classNames = classNamesFunction()(styles, props);
	return (
		<UIFabDropdown
			id={id}
			label={label}
			selectedKey={selectedKey}
			placeHolder={placeHolder}
			options={options}
			onChanged={onChange}
			onDismiss={onDismiss}
			className={classNames.root}
			onRenderPlaceHolder={onRenderPlaceHolder}
			onRenderTitle={onRenderTitle}
			onRenderCaretDown={onRenderCaretDown}
			dropdownWidth={dropdownWidth}
			responsiveMode={responsiveMode}
			multiSelect={multiSelect}
			defaultSelectedKeys={defaultSelectedKeys}
			selectedKeys={selectedKeys}
			multiSelectDelimiter={multiSelectDelimiter}
			onRenderOption={onRenderOption}
		/>
	);
}

Dropdown.propTypes = {
	/** HTML id tag of the root element */
	id: PropTypes.string,
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
			isSelected: PropTypes.bool,
			/** Custom data */
			data: PropTypes.object
		})
	).isRequired,
	/** onChange event handler function */
	onChange: PropTypes.func,
	/** Callback issues when the options callout is dismissed */
	onDismiss: PropTypes.func,
	/** Optional custom renderer for the ISelectableDroppableText option content */
	onRenderOption: PropTypes.func,
	/** Optional custom renderer for placeholder text */
	onRenderPlaceHolder: PropTypes.func,
	/** Optional custom renderer for selected option displayed in input */
	onRenderTitle: PropTypes.func,
	/** Optional custom renderer for chevron icon */
	onRenderCaretDown: PropTypes.func,
	/** Custom width for dropdown. If value is 0, width of the input field is used. */
	dropdownWidth: PropTypes.number,
	/** Reponsive mode. 0 - small, 1 - medium, 2 - large, 3 - xLarge, 4 - xxLarge, 5 - xxxLarge */
	responsiveMode: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
	/** Optional mode indicates if multi-choice selections is allowed.  Default to false */
	multiSelect: PropTypes.bool,
	/** Keys that will be initially used to set selected items. */
	defaultSelectedKeys: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.string),
		PropTypes.arrayOf(PropTypes.number)
	]),
	/**
	 * Keys of the selected items. If you provide this, you must maintain selection
	 * state by observing onChange events and passing a new value in when changed.
	 */
	selectedKeys: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.string),
		PropTypes.arrayOf(PropTypes.number)
	]),
	/** When multiple items are selected, this still will be used to separate values in the dropdown title. */
	multiSelectDelimiter: PropTypes.string,
	/** User-defined styling */
	styles: PropTypes.func
};

export default styled(customizable('Dropdown', ['theme'])(Dropdown), styles);
