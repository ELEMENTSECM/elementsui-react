import React from 'react';
import renderer from 'react-test-renderer';
import CommandBarButton from './CommandBarButton';

describe('CommandBarButton', () => {
	test('displays `Foo` as text', () => {
		const tree = renderer
			.create(<CommandBarButton id="testCommandBarButton" text="Foo" icon="Color" />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
