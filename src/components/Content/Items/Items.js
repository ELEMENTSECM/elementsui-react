import * as React from "react";
import PropTypes from "prop-types";
import { Well } from "react-bootstrap";
import classNames from "classnames";

export default function Items(props) {
	const { items, renderItem, onItemRemove, containerClassName, itemClassName } = props;
	return (
		<Well bsSize="sm" className={classNames("eui-items", containerClassName)}>
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
		</Well>
	);
}

Items.propTypes = {
	/** CSS class name for container element holding items  */
	containerClassName: PropTypes.string,
	/** CSS class name of item element */
	itemClassName: PropTypes.string,
	/** Function to return contents of item element */
	renderItem: PropTypes.func.isRequired,
	/** Array of items */
	items: PropTypes.array.isRequired,
	/** Function called when remove button is clicked on item element */
	onItemRemove: PropTypes.func.isRequired
};
