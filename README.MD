# Gulp-create-app

This gulp project for developing static pages (e.g. django, bitrix)

## Stack
<p align="center">
<a href="https://github.com/gulpjs/gulp" target="_blank" rel="noopener noreferrer">
<img width="77" height="170" src='./src/images/gulp-logo.png' alt='gulp-logo'>
</a>
<a href="https://github.com/rollup/rollup" target="_blank" rel="noopener noreferrer" style="margin-left: 4em">
<img width="115" height="150" src='./src/images/rollup-logo.png' alt='gulp-logo'>
</a>
</p>
<p align="center">
<p align="center">Gulp Rollup</p>
</p>


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