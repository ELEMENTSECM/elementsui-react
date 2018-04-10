import React from 'react';
import renderer from 'react-test-renderer';
import Label from './Label';

describe('Label', () => {
	test('displays correctly', () => {
		const tree = renderer
			.create(<Label	htmlId="defaultLabel" required={false} disabled={false} ></Label>)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
