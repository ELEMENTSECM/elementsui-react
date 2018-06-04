import React from 'react';
import renderer from 'react-test-renderer';
import BasePicker from './BasePicker';

const items = () => {
	return ['Andreas', 'Eren', 'Haakon', 'Jan Rune', 'Jarle'];
};

describe('BasePickerProps', () => {
	test('displays basepicker correctly', () => {
		const tree = renderer
			.create(
				<BasePicker
					id="basePicker"
					onResolveSuggestions={items}
					focus={false}
					focusInput={true}
				/>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
