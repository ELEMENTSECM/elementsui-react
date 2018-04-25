import React from 'react';
import renderer from 'react-test-renderer';
import Button from './Button';

describe('Button', () => {
	test('displays `Foo` as label', () => {
		const tree = renderer
			.create(<Button htmlId="defaultBtn" label="Foo" className="my-button" />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
