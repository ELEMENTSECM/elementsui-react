const path = require("path");
const HappyPack = require("happypack");

module.exports = ({ config }) => {
	config.resolve.modules.push(path.resolve(__dirname, "../src"), "node_modules");
	config.plugins.push(
		new HappyPack({
			id      : "ts",
			threads : 12,
			loaders : [
				{
					path  : "ts-loader",
					query : { happyPackMode: true, reportFiles: ["**/*.{ts,tsx}"] }
				}
			]
		})
	);
	config.module.rules.push(
		{
			test    : /\.(ts|tsx)$/,
			include : path.resolve(__dirname, "../src"),
			use     : [
				{ loader: "happypack/loader?id=ts" },
				{ loader: require.resolve("react-docgen-typescript-loader") }
			]
		},
		{
			test    : /\.(ts|tsx)$/,
			include : path.resolve(__dirname, "../stories"),
			loaders : [
				{ loader: "happypack/loader?id=ts" },
				{
					loader  : require.resolve("@storybook/source-loader"),
					options : { parser: "typescript" }
				}
			],
			enforce : "pre"
		}
	);
	config.resolve.extensions.push(".ts", ".tsx");
	return config;
};
