import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import Popup from "../src/Popup/Popup";
import { Alert } from "react-bootstrap";
import { radios, boolean, withKnobs } from "@storybook/addon-knobs";
import InfiniteList from "../src/InfiniteList";
import { withState } from "@dump247/storybook-state";
import { uniqueId, without } from "lodash";
import Items from "../src/Items";
import { padDecorator } from ".";

const getItems = () =>
	[...Array(20)].map((_, i) => ({
		title: `Item ${i}`,
		icon: "glyphicon glyphicon-large glyphicon-bell",
		iconColor: "#3d9c97"
	}));

storiesOf("Content/InfiniteList", module).addDecorator(padDecorator).add("Default usage", withState({
	items: getItems()
})(
	withInfo()(({ store }) => {
		const fetchMore = () => {
			const items = getItems();
			setTimeout(() => store.set({ items: store.state.items.concat(items) }), 1500);
		};
		return (
			<InfiniteList
				dataLength={store.state.items.length}
				next={fetchMore}
				hasMore={true}
				height={600}
			>
				{store.state.items.map((x, i) => (
					<InfiniteList.Item
						key={i}
						icon={x.icon}
						iconColor={x.iconColor}
						onClick={() => alert(`Item #${i} ${x.title} selected`)}
					>
						{x.title}
					</InfiniteList.Item>
				))}
			</InfiniteList>
		);
	})
), { info: { inline: true, header: false } });

storiesOf("Content/Items", module).addDecorator(padDecorator).add("Default usage", withState({ items: [] })(
	withInfo()(({ store }) => {
		const removeItem = item => {
			store.set({ items: without(store.state.items, item) });
		};

		const addItem = () => {
			store.set({ items: store.state.items.concat(uniqueId("Item_")) });
		};
		return (
			<div>
				<Items
					items={store.state.items as string[]}
					renderItem={x => x.toString()}
					onItemRemove={removeItem}
				/>
				<button onClick={addItem}>Add new item</button>
			</div>
		);
	})
), { info: { inline: true, header: false } });

storiesOf("Content/Popup", module).addDecorator(withInfo).addDecorator(withKnobs).add("Default usage", () => {
	const show = boolean("Show", false);
	const isDraggable = boolean("Draggable", true);
	const autoFocus = boolean("Autofocus", true);
	const target = document.getElementById("custom-root");
	const placement = radios(
		"Placement",
		{
			"auto-start": "auto-start",
			auto: "auto",
			"auto-end": "auto-end",
			"top-start": "top-start",
			top: "top",
			"top-end": "top-end",
			"right-start": "right-start",
			right: "right",
			"right-end": "right-end",
			"bottom-end": "bottom-end",
			bottom: "bottom",
			"bottom-start": "bottom-start",
			"left-end": "left-end",
			left: "left",
			"left-start": "left-start"
		},
		"auto-start"
	);
	return (
		<Popup
			show={show}
			isDraggable={isDraggable}
			targetNode={target}
			autoFocus={autoFocus}
			placement={placement}
		>
			<Alert bsStyle="warning">
				<strong>Holy guacamole!</strong> Best check yo self, you're not looking too good.
			</Alert>
		</Popup>
	);
}, { info: { inline: true, header: false } });
