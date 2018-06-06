import React from 'react';
import renderer from 'react-test-renderer';
import Panel from './Panel';

describe('Panel', () => {
	test('displays  `Foo` as headerText', () => {
		const tree = renderer.create(<Panel htmlId="testPanel" headerText="Foo" />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
