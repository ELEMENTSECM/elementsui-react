import * as React from "react";
import RichText, { RichTextProps } from "../../src/RichText";
import { Story, Meta } from "@storybook/react/types-6-0";

export default {
	title: "Inputs/RichText",

	component: RichText,
	argTypes: {
		config: {
			defaultValue: {
				toolbar: [
					[
						"Font",
						"FontSize",
						"Bold",
						"Italic",
						"Underline",
						"-",
						"NumberedList",
						"BulletedList",
						"-",
						"Outdent",
						"Indent",
						"-",
						"JustifyLeft",
						"JustifyCenter",
						"JustifyRight",
						"JustifyBlock",
						"-",
						"Link",
						"Maximize",
						"Preview",
					],
				],
				fontSize_sizes: [
					"8",
					"9",
					"10",
					"11",
					"12",
					"14",
					"16",
					"18",
					"20",
					"22",
					"24",
					"26",
					"28",
					"36",
					"48",
					"72",
				],
			},
			control: { type: "object" },
		},
	},
} as Meta;

export const Basic: Story<RichTextProps> = (args) => {
	return <RichText {...args} />;
};
Basic.storyName = "Basic usage";
