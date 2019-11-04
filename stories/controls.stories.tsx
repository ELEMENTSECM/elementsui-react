import * as React from "react";
import { storiesOf } from "@storybook/react";
import { padDecorator } from ".";
import { withState } from "@dump247/storybook-state";
import { withInfo } from "@storybook/addon-info";
import Dropdown from "../src/Dropdown";

storiesOf("Controls/Dropdown", module).addDecorator(padDecorator).add("Default usage", withState({
	dropdownOpen: false,
	submenu: false
})(
	withInfo()(({ store }) => {
		const toggle = menu => () => {
			store.set({ ...store.state, [menu]: !store.state[menu] });
		};

		const onClick = e => {
			alert(e.target.innerHTML);
		};
		return (
			<Dropdown isOpen={store.state.dropdownOpen} toggle={toggle("dropdownOpen")}>
				<Dropdown.Toggle caret>Dropdown</Dropdown.Toggle>
				<Dropdown.Menu>
					<Dropdown.Item>
						<Dropdown
							isOpen={store.state.submenu}
							parentToggle={toggle("dropdownOpen")}
							toggle={toggle("submenu")}
							direction="right"
							inNavbar
						>
							<Dropdown.Toggle menuItem caret>
								Dropdown2
							</Dropdown.Toggle>
							<Dropdown.Menu>
								<Dropdown.Item onClick={onClick}>Action 2</Dropdown.Item>
								<Dropdown.Item onClick={onClick}>Action 3</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</Dropdown.Item>

					<Dropdown.Item onClick={onClick}>Action 2</Dropdown.Item>
					<Dropdown.Item onClick={onClick}>Action 3</Dropdown.Item>
					<Dropdown.Item divider />
					<Dropdown.Item onClick={onClick}>Action 4</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		);
	})
), { info: { inline: true, header: false } });
