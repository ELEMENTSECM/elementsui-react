import React from 'react';
import { shallow } from 'enzyme';
import Button from '../../Inputs/Button';
import withTheme from './withTheme';

describe('withTheme', () => {
	test('Should render Button with theme applied', () => {
		const StyledButton = withTheme(Button, {
			neutralLighter: 'red',
			neutralSecondary: 'yellow',
			tealLight: 'red'
		});
		const wrapper = shallow(
			<StyledButton htmlId="defaultBtn" label="Default button" isPrimary={false} />
		);
		expect(wrapper).toMatchSnapshot();
	});
});
