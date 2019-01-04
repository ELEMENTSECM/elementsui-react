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
});
