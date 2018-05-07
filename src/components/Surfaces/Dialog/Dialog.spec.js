import React from 'react';
import renderer from 'react-test-renderer';
import Dialog from './Dialog';

describe('Dialog', () => {
	const dialogContentProps = {
		title: 'Dialog header',
		subText: 'Dialog content text with some description of what the dialog reveals.'
	};

	test('displays `Dialog` with dialogContentProps', () => {
		const tree = renderer
			.create(<Dialog htmlId="defaultDialog" dialogContentProps={dialogContentProps} />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
