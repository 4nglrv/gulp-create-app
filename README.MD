# Gulp-create-app

This gulp project for developing static pages (e.g. django)

## Stack
<a href="https://github.com/gulpjs/gulp" target="_blank" rel="noopener noreferrer">
<img width="77" height="170" src='./src/assets/gulp-logo.png' alt='gulp-logo'>
</a>
<a href="https://github.com/rollup/rollup" target="_blank" rel="noopener noreferrer" style="margin-left: 4em">
<img width="115" height="150" src='./src/assets/rollup-logo.png' alt='gulp-logo'>
</a>

## Commands

### Launch local host and build dist
```
yarn start
``` 
### Only build dist
```
yarn build
```  
### Convert all image from assets to webp format
```
yarn webp
```
### Remove dist folder
```
yarn rm
``` 

## Files & directories

| Name                |  Description                                  |
|----------------------|--------------------------------------------|
| `/dist`          | intended for distribution           |
| `/src`    | main project files                                 |
| `gulpfile.js`    | gulp configuration file                                 |
| `modules.js`    | included js and css modules                                 |
| `rollup.config.js`    | rollup configuration file                                 |

## 
To exclude from build the imported module, the name of the module should begin with a symbol _
```
_mainSctipt.js
```

## Include third-party libraries
```js
// ** Paths to CSS libs
// ** Build in _libs.css and send it to src/sass/root folder
var cssLibs = [ 
	"./node_modules/normalize.css/normalize.css"
]

// ** Modules which you import from node_modules
var nodeModules = {
	$: "jquery",
	'jQuery': 'jquery',
	'windows.jQuery': 'jquery',
	modules: {
		$: "jquery",
		'jQuery': 'jquery',
		'windows.jQuery': 'jquery',
	}
}
```
