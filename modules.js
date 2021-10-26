// ** Paths to CSS libs
// ** Build in _libs.css and send it to src/sass/root folder
var cssLibs = [ 
	"./node_modules/normalize.css/normalize.css"
]

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
