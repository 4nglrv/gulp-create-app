const uglify = require("rollup-plugin-uglify").uglify
const babel = require("@rollup/plugin-babel").getBabelOutputPlugin
const commonjs = require("@rollup/plugin-commonjs")
const nodeResolve = require("@rollup/plugin-node-resolve").nodeResolve
const inject = require("@rollup/plugin-inject")
var { nodeModules } = require("./modules")

nodeModules.include = "**/*.js"
const project_folder = "src"
const rollupConfig = {
	plugins: [ 
		babel({ 
			exclude: 'node_modules/**',
			presets: [["@babel/preset-env", { "modules": false }]]
		}), 
		commonjs({
		// non-CommonJS modules will be ignored, but you can also
		// specifically include/exclude files
		include: [ "./" + project_folder + "/js/index.js", "node_modules/**" ],
	
		// if true then uses of `global` won't be dealt with by this plugin
		ignoreGlobal: false, // Default: false
	
		// if false then skip sourceMap generation for CommonJS modules
		sourceMap: false // Default: true
	}), nodeResolve({
		jsnext: true,
		main: false
	}), inject(nodeModules), uglify() ],
}

// TODO: Make dev hosting

module.exports = rollupConfig