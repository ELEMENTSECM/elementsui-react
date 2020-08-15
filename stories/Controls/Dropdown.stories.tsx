import * as React from "react";
import Dropdown, { DropdownProps } from "../../src/Dropdown";
import { Story, Meta } from "@storybook/react/types-6-0";
import { State, Store } from "@sambego/storybook-state";

export default {
	title: "Controls/Dropdown",
	component: Dropdown,
} as Meta;

const store = new Store({ dropdownOpen: false, submenu: false });

const toggle = (menu) => {
	store.set({ [menu]: !store.state[menu] });
};

const onClick = (e) => {
	alert(e.target.innerHTML);
};

export const Basic: Story<DropdownProps> = () => {
	return (
		<State store={store}>
			{(state) => (
				<Dropdown isOpen={state.dropdownOpen} toggle={() => toggle("dropdownOpen")}>
					<Dropdown.Toggle caret>Dropdown</Dropdown.Toggle>
					<Dropdown.Menu>
						<Dropdown.Item>
							<Dropdown
								isOpen={state.submenu}
								parentToggle={() => toggle("dropdownOpen")}
								toggle={() => toggle("submenu")}
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
			)}
		</State>
	);
};
Basic.storyName = "Basic usage";
