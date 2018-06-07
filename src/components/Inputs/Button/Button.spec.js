import React from 'react';
import renderer from 'react-test-renderer';
import Button from './Button';

describe('Button', () => {
	test('displays `Foo` as label', () => {
		const tree = renderer
			.create(
				<Button id="defaultBtn" className="my-button">
					Foo
				</Button>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
