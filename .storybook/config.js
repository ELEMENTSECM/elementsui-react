import { configure } from "@storybook/react";
import { addDecorator, addParameters } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import { withConsole } from "@storybook/addon-console";
import elementsTheme from "./elements.theme";

addParameters({
	options : {
		panelPosition : "right",
		theme         : elementsTheme
	}
});

addDecorator(withA11y);
addDecorator((storyFn, context) => withConsole()(storyFn)(context));

const req = require.context("../stories", true, /\.stories\.tsx$/);
function loadStories() {
	req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
