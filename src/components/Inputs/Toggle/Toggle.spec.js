import React from 'react';
import renderer from 'react-test-renderer';
import Toggle from './Toggle';

describe('Toggle', () => {
	test('displays `Foo` as label', () => {
		const tree = renderer
			.create(<Toggle htmlId="defaultToggle" label="Foo"/>)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
