'use strict';

const path = require('path');
const paths = require('./paths');
const getClientEnvironment = require('./env');
const publicPath = paths.servedPath;
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
const publicUrl = publicPath.slice(0, -1);
const env = getClientEnvironment(publicUrl);

if (env.stringified['process.env'].NODE_ENV !== '"production"') {
	throw new Error('Production builds must have NODE_ENV=production.');
}

module.exports = {
	mode: 'production',
	bail: true,
	devtool: shouldUseSourceMap ? 'source-map' : false,
	entry: [paths.umdBuild],
	externals: {
		react: 'react',
		'react-dom': 'react-dom',
		'prop-types': 'prop-types',
		'lodash': 'lodash',
		'_': 'lodash'
	},
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

				],
				include: paths.appSrc
			}
		]
	},
	plugins: [
	],
	node: {
		dgram: 'empty',
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
		child_process: 'empty'
	}
};
