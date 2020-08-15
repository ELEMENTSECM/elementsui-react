module.exports = {
	framework: "@storybook/react",
	core: {
		builder: "webpack5",
	},
	stories: ["../stories/**/*.stories.@(js|jsx|ts|tsx)"],
	addons: [
		"@storybook/addon-knobs",
		"@storybook/addon-links",
		"@storybook/addon-storysource",
		"@storybook/addon-a11y",
		"@storybook/addon-essentials",
	],
};
