import { Story, Meta } from "@storybook/react/types-6-0";
import InfiniteList, { InfiniteListProps } from "../../src/InfiniteList";
import { State, Store } from "@sambego/storybook-state";
import classnames from "classnames";
import { Row, Col } from "react-bootstrap";

export default {
	title: "Content/InfiniteList",
	component: InfiniteList,
	args: {
		height: 600,
		keyboardNavigationEnabled: true,
	},
} as Meta;

const getItems = () =>
	[...Array(20)].map((_, i) => ({
		title: `Item ${i}`,
		icon: "glyphicon glyphicon-large glyphicon-bell",
		iconColor: "#3d9c97",
	}));

const store = new Store({
	items: getItems(),
	selectedIndex: undefined,
});

const fetchMore = () => {
	const items = getItems();
	setTimeout(() => store.set({ items: store.state.items.concat(items) }), 1500);
};

const onItemFocus = (index) => store.set({ selectedIndex: index });

export const Basic: Story<InfiniteListProps> = (args) => {
	return (
		<State store={store}>
			{(state) => (
				<InfiniteList {...args} dataLength={state.items.length} next={fetchMore} hasMore>
					{state.items.map((x, i) => (
						<InfiniteList.Item
							key={i}
							itemId={i}
							onFocus={onItemFocus}
							className={classnames("infinitelist-item", {
								active: state.selectedIndex === i,
								odd: i % 2 === 0 && state.selectedIndex !== i,
							})}
						>
							<Row>
								<Col xs={1}>
									<i style={x.iconColor ? { color: x.iconColor } : {}} className={x.icon} />
								</Col>
								<Col xs={10}>{x.title}</Col>
							</Row>
						</InfiniteList.Item>
					))}
				</InfiniteList>
			)}
		</State>
	);
};
Basic.storyName = "Basic usage";
