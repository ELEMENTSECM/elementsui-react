import { Story, Meta } from "@storybook/react/types-6-0";
import Popup, { PopupProps } from "../../src/Popup";
import { Alert } from "react-bootstrap";

export default {
	title: "Content/Popup",
	component: Popup,
	args: { show: false, isDraggable: true, autoFocus: true, placement: "auto-start" },
} as Meta;

export const Basic: Story<PopupProps> = (args) => {
	const target = document.getElementById("custom-root");
	return (
		<Popup {...args} targetNode={target}>
			<Alert bsStyle="warning" style={{ width: "auto" }}>
				<strong>Holy guacamole!</strong> Best check yo self, you're not looking too good.
			</Alert>
		</Popup>
	);
};
Basic.storyName = "Basic usage";
