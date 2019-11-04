import * as React from "react";
import { shallow } from "enzyme";
import Items from "..";
import { noop } from "lodash";

describe("Items", () => {
	test("displays correctly", () => {
		const wrapper = shallow(
			<Items items={["test item"]} renderItem={x => x.toString()} onItemRemove={noop} />
		);
		expect(wrapper).toMatchSnapshot();
	});
});
