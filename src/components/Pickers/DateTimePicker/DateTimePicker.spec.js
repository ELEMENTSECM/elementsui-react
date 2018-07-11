import * as React from "react";
import { shallow } from "enzyme";
import DateTimePicker from "./index";

describe("DateTimePicker", () => {
	test("displays correctly", () => {
		const wrapper = shallow(
			<DateTimePicker id="testDatePicker" locale="en" dateFormat={"LLL"} timeFormat={"LT"} />
		);
		expect(wrapper).toMatchSnapshot();
	});

	test("displays time only in time viewMode", () => {
		const wrapper = shallow(<DateTimePicker id="testDatePicker" locale="en" viewMode="time" timeFormat={"LT"} />);
		expect(wrapper.prop("dateFormat")).toBeFalsy();
		expect(wrapper).toMatchSnapshot();
	});
});
