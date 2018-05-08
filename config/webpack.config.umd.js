'use strict';

const path = require('path');
const webpack = require('webpack');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const paths = require('./paths');
const getClientEnvironment = require('./env');
const nodeExternals = require('webpack-node-externals');

const publicPath = paths.servedPath;
const shouldUseRelativeAssetPaths = publicPath === './';
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
const publicUrl = publicPath.slice(0, -1);
const env = getClientEnvironment(publicUrl);

if (env.stringified['process.env'].NODE_ENV !== '"production"') {
	throw new Error('Production builds must have NODE_ENV=production.');
}

module.exports = {
	bail: true,
	devtool: shouldUseSourceMap ? 'source-map' : false,
	entry: [paths.umdBuild],
	output: {
		path: paths.umd,
		filename: 'elementsui-react.umd.js',
		libraryTarget: "umd"
	},
	externals: [nodeExternals()],
	resolve: {
		modules: ['node_modules', paths.appNodeModules].concat(
			process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
		),
		extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
		alias: {
			'react-native': 'react-native-web',
			'elementsui-react': path.resolve(__dirname, '../src/components')
		}
	},
	module: {
		strictExportPresence: true,
		rules: [
			{
				test: /\.(js|jsx|mjs)$/,
				enforce: 'pre',
				use: [
					{
						options: {
							formatter: eslintFormatter,
							eslintPath: require.resolve('eslint')
						},
						loader: require.resolve('eslint-loader')
					}
				],
				include: paths.appSrc
			}
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				comparisons: false
			},
			mangle: {
				safari10: true
			},
			output: {
				comments: false,
				ascii_only: true
			},
			sourceMap: shouldUseSourceMap
		}),
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
	],
	node: {
		dgram: 'empty',
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
		child_process: 'empty'
	}
};
