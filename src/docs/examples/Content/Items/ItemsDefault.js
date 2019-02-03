import * as React from "react";
import Items from "elementsui-react/Content/Items";
import { Button } from "react-bootstrap";
import _ from "lodash";

export default class ItemsDefault extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			items: []
		};
	}

	removeItem = item => {
		this.setState(prevState => ({
			items: _.without(prevState.items, item)
		}));
	};

	addItem = item => {
		this.setState(prevState => ({
			items: prevState.items.concat(_.uniqueId("Item_"))
		}));
	};

	render() {
		const { items } = this.state;
		return (
			<React.Fragment>
				<Button onClick={this.addItem}>Add new item</Button>

				<Items items={items} renderItem={x => x.toString()} onItemRemove={this.removeItem} />
			</React.Fragment>
		);
	}
}
