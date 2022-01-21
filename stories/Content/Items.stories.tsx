import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import Items, { ItemsProps } from "../../src/Items";
import { State, Store } from "@sambego/storybook-state";
import { uniqueId, without, identity } from "lodash";

export default {
	title: "Content/Items",
	component: Items,
} as Meta;

const store = new Store({
	items: [] as string[],
});

const removeItem = (item) => {
	store.set({ items: without(store.state.items, item) });
};

const addItem = () => {
	store.set({ items: store.state.items.concat(uniqueId("Item_")) });
};

export const Basic: Story<ItemsProps<string>> = (args) => {
	return (
		<div>
			<State store={store}>
				{(state) => (
					<>
						<Items
							{...args}
							items={state.items}
							renderItem={identity}
							onItemRemove={removeItem}
						/>
						<button onClick={addItem}>Add new item</button>
					</>
				)}
			</State>
		</div>
	);
};
Basic.storyName = "Basic usage";
