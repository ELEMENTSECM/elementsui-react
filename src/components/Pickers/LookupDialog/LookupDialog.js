import PropTypes from "prop-types";
import * as React from "react";
import Draggable from "react-draggable";

export default class LookupDialog extends React.Component {
	handleClickOutside = () => {
		this.props.close();
	};

	render() {
		const {
			close,
			eventTypes,
			outsideClickIgnoreClass,
			preventDefault,
			stopPropagation,
			disableOnClickOutside,
			enableOnClickOutside,
			position,
			isDraggable,
			children,
			...rest
		} = this.props;
		const defaultPosition = {
			x: position.x,
			y: position.y + 5
		};

		return isDraggable ? (
			<Draggable handle=".popup-container" defaultPosition={defaultPosition}>
				<div
					className="popup-container"
					style={{
						position: "fixed",
						top: defaultPosition.x,
						left: defaultPosition.y,
						minWidth: 100,
						minHeight: 100,
						background: "#fff",
						zIndex: 99999,
						boxShadow: "2px 7px 24px 2px rgba(144,143,143,.8)",
						overflow: "hidden",
						display: "contents",
						opacity: 1
					}}
					{...rest}
				>
					{children}
				</div>
			</Draggable>
		) : (
			<React.Fragment>
				<div className="popup-overlay" style={{ zIndex: 1055 }} />
				<div
					className="popup-container ignore-react-onclickoutside"
					style={{
						top: 0,
						left: 0,
						opacity: 1,
						zIndex: 1056
					}}
				>
					{children}
				</div>
			</React.Fragment>
		);
	}
}

LookupDialog.propTypes = {
	/**
	 * Callback executed when a dialog is closed
	 */
	close: PropTypes.func,
	/**
	 * Abolute or fixed positioning for a dialog
	 */
	position: PropTypes.shape({
		x: PropTypes.number,
		y: PropTypes.number
	}).isRequired,
	/**
	 * Enabled drag n drop for a diealog
	 */
	isDraggable: PropTypes.bool
};
