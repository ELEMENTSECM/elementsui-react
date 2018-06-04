import React from 'react';
import renderer from 'react-test-renderer';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
	test('displays `Foo` as label', () => {
		const tree = renderer
			.create(<Checkbox id="defaultCheckbox" label="" />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
