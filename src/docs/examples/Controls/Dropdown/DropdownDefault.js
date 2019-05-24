import * as React from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "elementsui-react";

export default class Example extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			dropdownOpen: false,
			submenu: false
		};
	}

	toggle(menu) {
		this.setState(prevState => ({
			[menu]: !prevState[menu]
		}));
	}

	onClick = e => {
		console.log(e.target.innerHTML);
	};

	render() {
		return (
			<Dropdown isOpen={this.state.dropdownOpen} toggle={() => this.toggle("dropdownOpen")}>
				<DropdownToggle caret>Dropdown</DropdownToggle>
				<DropdownMenu>
					<DropdownItem>
						<Dropdown
							isOpen={this.state.submenu}
							parentToggle={() => this.toggle("dropdownOpen")}
							toggle={() => this.toggle("submenu")}
							direction="right"
							inNavbar>
							<DropdownToggle menuItem caret>
								Dropdown2
							</DropdownToggle>
							<DropdownMenu>
								<DropdownItem onClick={this.onClick}>Action 2</DropdownItem>
								<DropdownItem onClick={this.onClick}>Action 3</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</DropdownItem>

					<DropdownItem onClick={this.onClick}>Action 2</DropdownItem>
					<DropdownItem onClick={this.onClick}>Action 3</DropdownItem>
					<DropdownItem divider />
					<DropdownItem onClick={this.onClick}>Action 4</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		);
	}
}
