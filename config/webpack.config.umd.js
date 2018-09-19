"use strict";

const paths = require("./paths");
const getClientEnvironment = require("./env");
const publicPath = paths.servedPath;
const publicUrl = publicPath.slice(0, -1);
const env = getClientEnvironment(publicUrl);
const merge = require("webpack-merge");
const BaseConfig = require("./webpack.config.umd.base");
if (env.stringified["process.env"].NODE_ENV !== '"production"') {
	throw new Error("Production builds must have NODE_ENV=production.");
}

module.exports = merge(BaseConfig, {
	output: {
		library: "elementsui-react",
		path: paths.dist,
		filename: "elementsui-react.umd.js",
		libraryTarget: "umd",
		umdNamedDefine: true
	}
});
