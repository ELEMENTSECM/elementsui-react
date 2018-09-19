import * as React from "react";
import { shallow } from "enzyme";
import ListItem from "./index";

describe("ListItem", () => {
	test("displays correctly", () => {
		const wrapper = shallow(<ListItem link="#">Test title</ListItem>);
		expect(wrapper).toMatchSnapshot();
	});
});
