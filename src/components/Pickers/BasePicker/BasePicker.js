import * as React from 'react';
import PropTypes from 'prop-types';
import { TagPicker } from 'office-ui-fabric-react/lib/components/pickers/TagPicker/TagPicker';
import { styles } from './BasePicker.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';

/** BasePicker example */
export function BasePicker(props) {
	const {
		focus,
		focusInput,
		onResolveSuggestions,
		getTextFromItem,
		pickerSuggestionsProps,
		inputProps,
		className,
		theme,
		styles
	} = props;
	const classNames = classNamesFunction()(styles, props);
	return (
		<TagPicker
			className={classNames.root}
			focus={focus}
			focusInput={focusInput}
			onResolveSuggestions={onResolveSuggestions}
			getTextFromItem={getTextFromItem}
			pickerSuggestionsProps={pickerSuggestionsProps}
			inputProps={inputProps}
		/>
	);
}

BasePicker.propTypes = {
	/** Sets focus to the focus zone */
	focus: PropTypes.bool.isRequired,
	/** Set focus to the input  */
	focusInput: PropTypes.bool.isRequired,
	/** Callback when filtering*/
	onResolveSuggestions: PropTypes.func.isRequired,
	/** Text input suggestion */
	getTextFromItem: PropTypes.func,
	/** Suggestion dropdown props */
	pickerSuggestionsProps: PropTypes.object,
	/** Input props */
	inputProps: PropTypes.object
};

export default styled(customizable('BasePicker', ['theme'])(BasePicker), styles);
