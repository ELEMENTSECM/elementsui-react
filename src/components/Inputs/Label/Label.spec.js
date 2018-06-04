import React from 'react';
import renderer from 'react-test-renderer';
import Label from './Label';

describe('Label', () => {
	test('displays `Foo` as label', () => {
		const tree = renderer
			.create(
				<Label id="defaultLabel" required={false} disabled={false}>
					Foo
				</Label>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
