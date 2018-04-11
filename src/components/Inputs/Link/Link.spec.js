import React from 'react';
import renderer from 'react-test-renderer';
import Link from './Link';

describe('Link', () => {
	test('displays `evry.com` as href', () => {
        const tree = renderer
        .create(<Link htmlId="defaultLink" href="evry.com" />)
        .toJSON();
		expect(tree).toMatchSnapshot();
	});
});