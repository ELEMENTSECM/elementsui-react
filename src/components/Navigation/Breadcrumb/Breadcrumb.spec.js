import React from 'react';
import renderer from 'react-test-renderer';
import Breadcrumb from './Breadcrumb';

describe('Breadcrumb', () => {
	test('displays `Default Breadcrumb` as ariaLabel', () => {
		const tree = renderer
			.create(<Breadcrumb htmlId="defaultBreadcrumb" ariaLabel="Default Breadcrumb" />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
