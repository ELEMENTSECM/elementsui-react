import { withConsole } from "@storybook/addon-console";

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
};

export const decorators = [(storyFn, context) => withConsole()(storyFn)(context)];
