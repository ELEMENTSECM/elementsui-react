import * as React from "react";
import InfiniteList from "elementsui-react/Content/InfiniteList";
import ListItem from "elementsui-react/Content/ListItem";

/** Infinite list default */
export default class InfiniteListDefault extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: this.generate20Items()
		};
	}

	generate20Items = () => {
		return [ ...Array(20) ].map((_, i) => {
			return {
				title: `Item ${i}`,
				styles: () => ({
					icon: [
						"glyphicon-large",
						"glyphicon",
						"glyphicon-bell",
						{
							color: "#3d9c97"
						}
					]
				})
			};
		});
	};

	fetchMore = () => {
		const items = this.generate20Items();
		setTimeout(() => {
			this.setState((previousState) => ({
				items: previousState.items.concat(items)
			}));
		}, 1500);
	};

	render() {
		return (
			<InfiniteList
				locale="en"
				dataLength={this.state.items.length}
				next={this.fetchMore}
				hasMore={true}
				pullDownToRefresh={true}
				height={400}
				refreshFunction={() => this.setState(() => ({ items: this.generate20Items() }))}
			>
				{this.state.items.map((x, i) => (
					<ListItem key={i} styles={x.styles} onClick={() => alert(`Item #${i} ${x.title} selected`)}>
						{x.title}
					</ListItem>
				))}
			</InfiniteList>
		);
	}
}
