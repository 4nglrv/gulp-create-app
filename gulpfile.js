var gulp = require("gulp"),
	{ series, dest, src } = require("gulp"),
	rollup = require("gulp-better-rollup"),
	sass = require("gulp-sass"),
	fileinclude = require("gulp-file-include"),
	sourcemaps = require("gulp-sourcemaps"),
	autoprefixer = require("gulp-autoprefixer"),
	concat = require("gulp-concat"),
	webp = require("gulp-webp"),
	cleancss = require("gulp-clean-css"),
	rename = require("gulp-rename"),
	imagemin = require("gulp-imagemin"),
	del = require("del"),
	browserSync = require("browser-sync").create(),
	{ cssLibs } = require("./modules"),
	rollupConfig = require("./rollup.config")

const source_folder = "src"
const build_folder = "dist"

const paths = {
	src: {
		html: [ source_folder + "/pages/**.html", "!" + source_folder + "/html/_*.html" ],
		sass: [ source_folder + "/sass/**.sass", "!" + source_folder + "/sass/_*.sass" ],
		assets: source_folder + "/assets/**.*",
		css: build_folder + "/css/**/*.css",
		js: [ source_folder + "/js/**/*.js", "!" + source_folder + "/js/**/_*.js" ],
		cssLibs: source_folder + "/sass/root/"
	},

	build: {
		html: build_folder + "/",
		css: build_folder + "/css/",
		assets: build_folder + "/assets/",
		js: build_folder + "/js/",
		favicon: build_folder + "/assets/favicon/"
	},

	watch: {
		html: [ source_folder + "/pages/**/*.html", source_folder + "/components/**/*.html" ],
		sass: source_folder + "/sass/**/*",
		assets: source_folder + "/assets/**/*",
		js: source_folder + "/js/**/*.js"
	},

	prod: {
		html: [ `${build_folder} + '/main.html'` ]
	},

	clean: "./" + build_folder + "/"
}

// Unifies required .css of all used CSS libraries in _libs.css file and send it to src/scss folder
gulp.task("css-libs", (done) => {
	src(cssLibs).pipe(concat("_libs.scss")).pipe(dest(paths.src.cssLibs)).pipe(browserSync.stream({once: true}))
	done()
})

// Copy assets
gulp.task("assets", (done) => {
	src(paths.src.assets)
		.pipe(
			imagemin({
				progressive: true,
				svgoPlugins: [ { removeViewBox: false } ],
				interlaced: true,
				optimizationLevel: 3
			})
		)
		.pipe(dest(paths.build.assets))
		.pipe(browserSync.stream({once: true}))
	done()
})

// Convert is webp
gulp.task("webp", (done) => {
	src(paths.src.assets)
		.pipe(webp({ quality: 80 }))
		.pipe(dest(paths.build.assets))
	done()
})

// Rollup builder
gulp.task("rollup", (done) => {
	src(paths.src.js)
		.pipe(sourcemaps.init())
		.pipe(rollup(rollupConfig, { 
			format: "esm" 
		}))
		.on("error", (err) => console.log(err))
		.pipe(concat("scripts.js"))
		.pipe(sourcemaps.write("."))
		.pipe(dest(paths.build.js))
		.pipe(browserSync.stream({once: true}))
	done()
})

// SASS Compiler and Post CSS
gulp.task("sass", (done) => {
	src(paths.src.sass)
		.pipe(
			sass({
				outputStyle: "expanded"
			}).on("error", (err) => {
				console.error(err.message)
			})
		)
		.pipe(
			autoprefixer({
				overrideBrowserslist: [ "last 2 versions" ],
				cascade: true
			})
		)
		.pipe(dest(paths.build.css))
		.pipe(cleancss())
		.pipe(
			rename({
				extname: ".min.css"
			})
		)
		.pipe(dest(paths.build.css))
		.pipe(browserSync.stream({once: true}))
	done()
})

// HTML include
gulp.task("html", (done) => {
	src(paths.src.html)
		.pipe(
			fileinclude({
				prefix: "@@",
				basepath: "@file"
			})
		)
		.pipe(dest(paths.build.html))
		.pipe(browserSync.stream({once: true}))
	done()
})

// Browser sync
gulp.task("serve", (done) => {
	browserSync.init({
		server: {
			baseDir: paths.clean
		},
		port: 5000,
		notify: false,
		directory: true
	})
	done()
})

// Watchers
gulp.task("watchFiles", (done) => {
	gulp.watch(paths.watch.html).on("change", gulp.series("html", browserSync.reload))
	gulp.watch(paths.watch.sass).on("change", gulp.series("sass", browserSync.reload))
	gulp.watch(paths.watch.js).on("change", gulp.series("rollup", browserSync.reload))
	gulp.watch(paths.watch.assets).on("change", gulp.series("assets", browserSync.reload))
	done()
})

gulp.task(
	"default",
	series(gulp.parallel("html", "rollup", "sass", "assets", "css-libs"), gulp.parallel("watchFiles", "serve"))
)

gulp.task("rm", (done) => {
	del(paths.clean)
	done()
	console.log("\x1b[32m%s", "dist folder has been removed")
})

gulp.task(
	"build",
	series(gulp.parallel("html", "rollup", "sass", "assets", "css-libs"))
)

gulp.task(
	"webp",
	series(gulp.parallel("webp"))
)