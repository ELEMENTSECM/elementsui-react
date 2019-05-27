import * as React from "react";
import Popup from "elementsui-react/Content/Popup";
import { Button } from "react-bootstrap";
import Draggable from "react-draggable";

export default class PopupDefault extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			popupOpened: false,
			popup2Opened: false,
			popup2target: undefined
		};
	}

	onHide = () => {
		this.setState({ popupOpened: false, popup2Opened: false });
	};

	openPopup = () => {
		this.setState({ popupOpened: true });
	};

	openPopup2 = (e) => {
		this.setState({ popup2Opened: true, popup2target: e.target });
	};

	render() {
		return (
			<React.Fragment>
				<Button onClick={this.openPopup}>Open in screen center</Button>
				<Button onClick={this.openPopup2}>Open next to me</Button>

				{this.state.popupOpened && (
					<Popup onHide={this.onHide}>
						<span>You can drag me!</span>
					</Popup>
				)}
				{this.state.popup2Opened && (
					<Popup onHide={this.onHide} targetNode={this.state.popup2target} placement="bottom-start">
						<input type="text" style={{color:"black"}}/>
						<span>You can drag me!</span>
					</Popup>
				)}
			</React.Fragment>
		);
	}
}
