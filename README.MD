# Gulp-create-app

This gulp project for developing static pages (e.g. django, bitrix)
<p align="center">
<a href="https://github.com/gulpjs/gulp" target="_blank" rel="noopener noreferrer">
<img width="77" height="170" src='https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png' alt='gulp-logo' align="center">
</a>
<a href="https://github.com/rollup/rollup" target="_blank" rel="noopener noreferrer" style="margin-left: 4em">
<img width="115" height="150" src='https://camo.githubusercontent.com/50e43473527a57747fb7cd9b0061355205ac9a2763207a78d9812ceef1da52c0/68747470733a2f2f726f6c6c75706a732e6f72672f6c6f676f2e737667' alt='rollup-logo' align="center">
</a>
<a href="https://pugjs.org"><img src="https://cdn.rawgit.com/pugjs/pug-logo/eec436cee8fd9d1726d7839cbe99d1f694692c0c/SVG/pug-final-logo-_-colour-128.svg" height="200" align="center"></a>
</p>


## Commands

### Launch localhost
```
yarn start
``` 
### Launch localhost with one page (when u have many pages)
```
yarn start --page <name>
``` 
### Only build dist
```
yarn build
```  
### Optimize and convert all images to webp format
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

To exclude from build the imported module, the name of the module should begin with a symbol _
```
_mainSctipt.js
```
---
## Gulp plugins docs
### Fileinclude
[Docs in npmjs](https://www.npmjs.com/package/gulp-file-include)

---
## Third-party libraries for dev
### Splide for sliders
[Splide docs](https://splidejs.com) 
### Bootstrap-4-grid
[Docs in npmjs](https://www.npmjs.com/package/bootstrap-4-grid) 
### Form validation with jQuery
[Jquery validation Docs](https://jqueryvalidation.org/documentation) 
### Masked Input Plugin for jQuery
[Docs in npmjs](https://www.npmjs.com/package/jquery.maskedinput) 
