import * as React from "react";
import { shallow } from "enzyme";
import InfiniteList from "./index";

describe("InfiniteList", () => {
	test("displays correctly", () => {
		const wrapper = shallow(
			<InfiniteList locale="en" dataLength={20} hasMore={false}>
				{[ ...Array(20) ].map((_, i) => {
					return <div key={i}>Item {i}</div>;
				})}
			</InfiniteList>
		);
		expect(wrapper).toMatchSnapshot();
	});
});
