const path = require("path");

module.exports = {
	assetsDir: "public",
	ignore: [
		"**/__tests__/**",
		"**/*.test.{js,jsx,ts,tsx}",
		"**/*.spec.{js,jsx,ts,tsx}",
		"**/*.d.ts",
		"**/*.styles.ts",
		"**/index.ts",
		"**/*.nls.ts"
	],
	propsParser: require("react-docgen-typescript").parse,
	require: [ path.join(__dirname, "src/index.css"), path.join(__dirname, "public/css/bootstrap.min.css") ],
	webpackConfig: require("./config/webpack.config.dev")
};
