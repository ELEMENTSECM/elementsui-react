import * as React from "react";
import { Well } from "react-bootstrap";
import classNames from "classnames";
import styled from "styled-components";
import { ItemsContainer } from "./Items.components";

export interface ItemsProps<TItem> {
	/** CSS class name for container element holding items  */
	containerClassName?: string;
	/** CSS class name of item element */
	itemClassName?: string;
	/** Function to return contents of item element */
	renderItem: (item: TItem) => React.ReactNode;
	/** Array of items */
	items: TItem[];
	/** Function called when remove button is clicked on item element */
	onItemRemove: (item: TItem) => any;
}

export default function Items<T>(props: ItemsProps<T>) {
	const { items, renderItem, onItemRemove, containerClassName, itemClassName } = props;
	return (
		<ItemsContainer bsSize="sm" className={classNames("eui-items", containerClassName)}>
			<ul className="eui-items__list">
				{items.map((item, index) => (
					<li key={index} className={classNames("eui-items__list__item", itemClassName)}>
						<button
							type="button"
							className="eui-items__list__item__remove"
							onClick={() => onItemRemove(item)}
						>
							×
						</button>
						<span>{renderItem(item)}</span>
					</li>
				))}
			</ul>
		</ItemsContainer>
	);
}
