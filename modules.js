// ** Paths to CSS libs
// ** Build in _libs.css and send it to src/sass/root folder
var cssLibs = []

// ** Modules which you import from node_modules
var nodeModules = {
	modules: {
		$: "jquery",
		'jQuery': 'jquery',
		'windows.jQuery': 'jquery',
	}
}

module.exports = {
	cssLibs,
	nodeModules
}
