import React from 'react';
import renderer from 'react-test-renderer';
import Tooltip from './Tooltip';

describe('Tooltip', () => {
	test('displays `Tooltip` as content', () => {
		const tree = renderer
			.create(<Tooltip htmlId="defaultTooltip" content="Tooltip" label="Foo" />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
