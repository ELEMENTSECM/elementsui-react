import React from 'react';
import renderer from 'react-test-renderer';
import Dialog from './Dialog';

describe('Dialog', () => {
	test('displays `Dialog` with dialogContentProps', () => {
		const tree = renderer
			.create(
				<Dialog
					id="testDialog"
					dialogContentProps={{
						type: 0,
						title: 'Dialog header',
						subText: 'Dialog content text with some description of what the dialog reveals.'
					}}
					modalProps={{
						isBlocking: false,
						isDarkOverlay: true,
						containerClassName: 'ms-dialogMainOverride'
					}}
				/>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
