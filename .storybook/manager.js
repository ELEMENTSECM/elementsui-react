import { addons } from "@storybook/addons";
import { create } from "@storybook/theming/create";
import logo from "./new-elements-logo-svg.svg";

const theme = create({
	base: "light",
	colorPrimary: "#053954",
	colorSecondary: "#053954",
	brandImage: logo,
	brandTitle: "ElementsUI-React",
});

addons.setConfig({
	panelPosition: "right",
	theme,
});
