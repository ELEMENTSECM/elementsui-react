import * as React from "react";
import { shallow } from "enzyme";
import RichText from "..";

describe("RichText", () => {
	test("renders as expected", () => {
		const wrapper = shallow(<RichText />);
		expect(wrapper).toMatchSnapshot();
	});
});
