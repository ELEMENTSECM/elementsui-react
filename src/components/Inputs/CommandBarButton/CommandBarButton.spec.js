import React from 'react';
import renderer from 'react-test-renderer';
import CommandBarButton from './CommandBarButton';

describe('CommandBarButton', () => {
	test('displays `Foo` as text', () => {
		const tree = renderer.create(<CommandBarButton text="Foo" icon="Color" />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
