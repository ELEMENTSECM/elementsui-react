import * as React from "react";
import { shallow } from "enzyme";
import Items from "./index";
import _ from "lodash";

describe("Items", () => {
	test("displays correctly", () => {
		const wrapper = shallow(<Items items={["test item"]} renderItem={x => x.toString()} onItemRemove={_.noop} />);
		expect(wrapper).toMatchSnapshot();
	});
});
