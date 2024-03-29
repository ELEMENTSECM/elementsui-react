import { shallow } from "enzyme";
import DateTimePicker from "..";

describe("DateTimePicker", () => {
	test("displays correctly", () => {
		const wrapper = shallow(
			<DateTimePicker id="testDatePicker" locale="en" dateFormat={"LLL"} timeFormat={"LT"} />
		);
		expect(wrapper).toMatchSnapshot();
	});
});
