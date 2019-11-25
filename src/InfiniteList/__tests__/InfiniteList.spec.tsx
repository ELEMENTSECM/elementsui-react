import * as React from "react";
import { shallow } from "enzyme";
import InfiniteList from "..";

describe("InfiniteList", () => {
	test("displays correctly", () => {
		const wrapper = shallow(
			<InfiniteList dataLength={20} hasMore={false}>
				{new Array(20).fill(null).map((_, i) => {
					return <InfiniteList.Item key={i}>Item {i}</InfiniteList.Item>;
				})}
			</InfiniteList>
		);
		expect(wrapper).toMatchSnapshot();
	});
});
