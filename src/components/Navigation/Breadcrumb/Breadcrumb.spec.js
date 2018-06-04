import React from 'react';
import renderer from 'react-test-renderer';
import Breadcrumb from './Breadcrumb';

describe('Breadcrumb', () => {
	test('displays `Default Breadcrumb` as ariaLabel', () => {
		const tree = renderer
			.create(
				<Breadcrumb id="defaultBreadcrumb" ariaLabel="Default Breadcrumb" items={['1', '2']} />
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
