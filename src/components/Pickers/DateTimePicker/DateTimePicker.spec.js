import * as React from 'react';
import { shallow } from 'enzyme';
import DateTimePicker from './index';

describe('DateTimePicker', () => {
	test('displays correctly', () => {
		function addDays(date, days) {
			var result = new Date(date);
			result.setDate(result.getDate() + days);
			return result;
		}

		const dateFrom = new Date('01/01/2018');
		const dateTo = addDays(dateFrom, 10);
		const wrapper = shallow(
			<DateTimePicker
				id="testDatePicker"
				locale="en"
				dateFrom={dateFrom}
				dateTo={dateTo}
				dateFormat={'LLL'}
				timeFormat={'LT'}
			/>
		);
		expect(wrapper).toMatchSnapshot();
	});
});
