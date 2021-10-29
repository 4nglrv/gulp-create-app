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
	{ rollupConfig, format } = require("./rollup.config"),
	ttf2woff = require("gulp-ttf2woff"),
	ttf2woff2 = require("gulp-ttf2woff2")

const source_folder = "src"
const build_folder = "dist"

const paths = {
	src: {
		html: [
			source_folder + "/pages/**.html",
			"!" + source_folder + "/pages/_*.html",
		],
		sass: [
			source_folder + "/sass/**.sass",
			"!" + source_folder + "/sass/_*.sass",
		],
		images: source_folder + "/images/**.*",
		fonts: source_folder + "/fonts/**.*",
		css: build_folder + "/css/**/*.css",
		js: [source_folder + "/js/**/*.js", "!" + source_folder + "/js/**/_*.js"],
		cssLibs: source_folder + "/sass/root/",
	},

	build: {
		html: build_folder + "/html/",
		css: build_folder + "/css/",
		images: build_folder + "/images/",
		fonts: build_folder + "/fonts/",
		js: build_folder + "/js/",
		favicon: build_folder + "/images/favicon/",
	},

	watch: {
		html: [
			source_folder + "/pages/**/*.html",
			source_folder + "/components/**/*.html",
		],
		sass: source_folder + "/sass/**/*",
		images: source_folder + "/images/**/*",
		fonts: source_folder + "/fonts/**.*",
		js: source_folder + "/js/**/*.js",
	},

	prod: {
		html: [`${build_folder} + '/main.html'`],
	},

	clean: "./" + build_folder + "/",
}

// Unifies required .css of all used CSS libraries in _libs.css file and send it to src/scss folder
gulp.task("css-libs", (done) => {
	if (cssLibs.length > 0) {
		src(cssLibs)
			.pipe(concat("_libs.scss"))
			.pipe(dest(paths.src.cssLibs))
			.pipe(browserSync.stream({ once: true }))
	}
	done()
})

// Copy images
gulp.task("images", (done) => {
	src(paths.src.images)
		.pipe(dest(paths.build.images))
		.pipe(browserSync.stream({ once: true }))
	done()
})

// Copy fonts
gulp.task("fonts", (done) => {
	src(paths.src.fonts)
		.pipe(ttf2woff())
		.pipe(dest(paths.build.fonts))
		.pipe(browserSync.stream({ once: true }))
	src(paths.src.fonts)
		.pipe(ttf2woff2())
		.pipe(dest(paths.build.fonts))
		.pipe(browserSync.stream({ once: true }))
	done()
})

// Convert is webp
gulp.task("webp", (done) => {
	src(paths.src.images)
		.pipe(webp({ quality: 80 }))
		.pipe(
			imagemin({
				progressive: true,
				svgoPlugins: [{ removeViewBox: false }],
				interlaced: true,
				optimizationLevel: 3,
			})
		)
		.pipe(dest(paths.build.images))
	done()
})

// Rollup builder
gulp.task("rollup", (done) => {
	src(paths.src.js)
		.pipe(sourcemaps.init())
		.pipe(
			rollup(rollupConfig, {
				format: format,
			})
		)
		.on("error", (err) => console.log(err))
		.pipe(sourcemaps.write("."))
		.pipe(dest(paths.build.js))
		.pipe(browserSync.stream({ once: true }))
	done()
})

// SASS Compiler and Post CSS
gulp.task("sass", (done) => {
	src(paths.src.sass)
		.pipe(
			sass({
				outputStyle: "expanded",
			}).on("error", (err) => {
				console.error(err.message)
			})
		)
		.pipe(
			autoprefixer({
				overrideBrowserslist: ["last 2 versions"],
				cascade: true,
			})
		)
		.pipe(dest(paths.build.css))
		.pipe(cleancss())
		.pipe(
			rename({
				extname: ".min.css",
			})
		)
		.pipe(dest(paths.build.css))
		.pipe(browserSync.stream({ once: true }))
	done()
})

// HTML include
gulp.task("html", (done) => {
	src(paths.src.html)
		.pipe(
			fileinclude({
				prefix: "@@",
				basepath: "@file",
			})
		)
		.pipe(dest(paths.build.html))
		.pipe(browserSync.stream({ once: true }))
	done()
})

// Browser sync
gulp.task("serve", (done) => {
	browserSync.init({
		server: {
			baseDir: paths.clean,
		},
		port: 5000,
		notify: false,
		directory: true,
	})
	done()
})

// Watchers
gulp.task("watchFiles", (done) => {
	gulp
		.watch(paths.watch.html)
		.on("change", gulp.series("html", browserSync.reload))
	gulp
		.watch(paths.watch.sass)
		.on("change", gulp.series("sass", browserSync.reload))
	gulp
		.watch(paths.watch.js)
		.on("change", gulp.series("rollup", browserSync.reload))
	gulp
		.watch(paths.watch.images)
		.on("change", gulp.series("images", browserSync.reload))
	done()
})

gulp.task(
	"default",
	series(
		gulp.parallel("html", "rollup", "sass", "images", "fonts", "css-libs"),
		gulp.parallel("watchFiles", "serve")
	)
)

gulp.task("rm", (done) => {
	del(paths.clean)
	done()
	console.log("\x1b[32m%s", "dist folder has been removed")
})

gulp.task(
	"build",
	series(gulp.parallel("html", "rollup", "sass", "fonts", "images", "css-libs"))
)

gulp.task("webp", series(gulp.parallel("webp")))

// TODO: Add include font styles

function includeStyles(params) {

}

function callback() {

}
