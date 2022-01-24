import Spinner, { SpinnerProps } from "../../src/Spinner";
import { Story, Meta } from "@storybook/react/types-6-0";
import { withKnobs, number, radios } from "@storybook/addon-knobs";

export default {
	title: "Indicators/Spinner",
	component: Spinner,
	decorators: [withKnobs],
	argTypes: {
		size: { type: { name: "string" } },
		type: {
			defaultValue: "clip",
			control: { type: "radio", options: ["clip", "fade", "bar", "sync", "pulse", "bounce"] },
		},
		color: {
			defaultValue: "#2180c0",
			control: { type: "color" },
		},
	},
} as Meta;

export const Basic: Story<SpinnerProps> = (args) => {
	const sizeValue = number("Size value", 20, {
		range: true,
		min: 10,
		max: 200,
		step: 1,
	});

	const sizeUnit = radios(
		"Size unit",
		{
			px: "px",
			rem: "rem",
		},
		"px"
	);

	return (
		<Spinner
			label="Please wait while we're fetching your 🌮..."
			{...args}
			size={args.size || `${sizeValue}${sizeUnit}`}
		/>
	);
};
Basic.storyName = "Basic usage";
