import * as React from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "elementsui-react";

export default class Example extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			dropdownOpen: false
		};
	}

	toggle = () => {
		this.setState(prevState => ({
			dropdownOpen: !prevState.dropdownOpen
		}));
	};

	onClick = e => {
		console.log(e.target.innerHTML);
	};

	render() {
		return (
			<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
				<DropdownToggle caret>Dropdown</DropdownToggle>
				<DropdownMenu>
					<DropdownItem disabled>Action 1</DropdownItem>
					<DropdownItem onClick={this.onClick}>Action 2</DropdownItem>
					<DropdownItem onClick={this.onClick}>Action 3</DropdownItem>
					<DropdownItem divider />
					<DropdownItem onClick={this.onClick}>Action 4</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		);
	}
}
