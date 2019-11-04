import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withKnobs, number, radios, color } from "@storybook/addon-knobs";
import Spinner from "../src/Spinner";
import { padDecorator } from ".";

storiesOf("Indicators/Spinner", module)
	.addDecorator(withInfo)
	.addDecorator(padDecorator)
	.addDecorator(withKnobs)
	.add(
		"Default usage",
		() => {
			const size = number("Size", 20, {
				range: true,
				min: 10,
				max: 200,
				step: 1
			});
			const unit = radios(
				"sizeUnit",
				{
					px: "px",
					rem: "rem"
				},
				"px"
			);
			const type = radios(
				"Type",
				{
					clip: "clip",
					fade: "fade",
					bar: "bar",
					sync: "sync",
					pulse: "pulse",
					bounce: "bounce"
				},
				"clip"
			);
			const clr = color("Color", "#2180c0");
			return (
				<Spinner
					label="Please wait while we're fetching your 🌮..."
					size={size}
					color={clr}
					type={type}
					sizeUnit={unit}
				/>
			);
		},
		{
			info: { inline: true, header: false }
		}
	);
