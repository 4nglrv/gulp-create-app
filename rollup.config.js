const uglify = require("rollup-plugin-uglify").uglify
const getBabelOutputPlugin =
	require("@rollup/plugin-babel").getBabelOutputPlugin
const { babel } = require("@rollup/plugin-babel")
const commonjs = require("@rollup/plugin-commonjs")
const nodeResolve = require("@rollup/plugin-node-resolve").nodeResolve
const inject = require("@rollup/plugin-inject")
var { nodeModules } = require("./modules")

nodeModules.include = "**/*.js"
const project_folder = "src"
const format = "umd"

const rollupConfig = {
	plugins: [
		nodeResolve({
			jsnext: true,
			main: false,
			browser: true,
		}),
		commonjs({
			// non-CommonJS modules will be ignored, but you can also
			// specifically include/exclude files
			include: ["./" + project_folder + "/js/es6/index.js", "node_modules/**"],

			// if true then uses of `global` won't be dealt with by this plugin
			ignoreGlobal: false, // Default: false

			// if false then skip sourceMap generation for CommonJS modules
			sourceMap: false, // Default: true
		}),
		babel({ babelHelpers: 'bundled' }),
		uglify(),
	],
	output: [
		{
			file: "scripts.js",
			format: format,
			plugins: [
				getBabelOutputPlugin({
					exclude: "node_modules/**",
					presets: [
						[
							"@babel/preset-env",
							{
								modules: false,
							},
						],
					],
					plugins: [
						"@babel/plugin-transform-modules-umd",
						"@babel/transform-runtime",
					],
				}),
			],
		},
	],
}

// TODO: Make dev hosting faster
// ** https://stackoverflow.com/questions/45785357/how-to-disable-tree-shaking-in-rollupjs **

module.exports = {
	rollupConfig,
	format
}
