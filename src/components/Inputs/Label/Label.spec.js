import React from 'react';
import renderer from 'react-test-renderer';
import Label from './Label';

describe('Label', () => {
	test('displays `Foo` as label', () => {
		const tree = renderer
			.create(<Label htmlId="defaultLabel" required={false} disabled={false} label="Foo" />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
