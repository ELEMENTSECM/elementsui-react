import * as React from 'react';
import BasePicker from 'elementsui-react/Pickers/BasePicker';

const items = [
	'Andreas',
	'Eren',
	'Haakon',
	'Jan Rune',
	'Jarle',
	'Knut',
	'Cecilie',
	'Gunnar',
	'Marius',
	'Morten',
	'Omar',
	'Peter',
	'Pippi',
	'Roar',
	'Robert',
	'Silje',
	'Vigdis',
	'Vlad',
	'Yngve'
].map(item => ({ key: item, name: item }));

/** Basepicker default */
export default function BasePickerDefault() {
	const _whenFiltering = (filterText, itemList) => {
		return filterText
			? items
					.filter(item => item.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0)
					.filter(item => !_listContainsItems(item, itemList))
			: [];
	};

	const _listContainsItems = (item, itemList) => {
		if (!itemList || !itemList.length || itemList.length === 0) {
			return false;
		}
		return itemList.filter(compareTag => compareTag.key === item.key).length > 0;
	};

	const _suggestItemWhenFiltering = item => {
		return item.name;
	};

	return (
		<BasePicker
			id="basePicker"
			focus={true}
			focusInput={true}
			onResolveSuggestions={_whenFiltering}
			getTextFromItem={_suggestItemWhenFiltering}
			pickerSuggestionsProps={{
				suggestionsHeaderText: 'Suggested Items',
				noResultsFoundText: 'Ops!! No item found'
			}}
			inputProps={{
				onBlur: ev => console.log('onBlur called'),
				onFocus: ev => console.log('onFocus called'),
				'aria-label': 'Item Picker'
			}}
		/>
	);
}
