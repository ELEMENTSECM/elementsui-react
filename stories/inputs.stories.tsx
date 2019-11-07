import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withKnobs, object } from "@storybook/addon-knobs";
import { padDecorator } from ".";
import RichText from "../src/RichText";

storiesOf("Inputs/RichText", module)
	.addDecorator(withInfo)
	.addDecorator(padDecorator)
	.addDecorator(withKnobs)
	.add(
		"Default usage",
		() => {
			const config = object("Config", {
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
						"Preview"
					]
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
					"72"
				]
			});
			return <RichText config={config} withPlugins={false} />;
		},
		{
			info: { inline: true, header: false }
		}
	);
