import React from 'react';
import { shallow } from 'enzyme';
import Button from '../../Inputs/Button';
import withTheme from './withTheme';

describe('withTheme', () => {
	test('Should render Button with theme applied', () => {
		const StyledButton = withTheme(Button, {
			buttonBackground: 'blue',
			buttonBackgroundHovered: 'red',
			buttonText: 'white',
			buttonTextHovered: 'teal'
		});
		const wrapper = shallow(
			<StyledButton htmlId="defaultBtn" label="Default button" isPrimary={false} />
		);
		expect(wrapper).toMatchSnapshot();
	});
});
