// Add our dependencies
var gulp = require("gulp"), // Main Gulp module
  open = require("gulp-open"), // Gulp browser opening plugin
  connect = require("gulp-connect"), // Gulp Web server runner plugin
  sass = require("gulp-sass"), // Gulp sass to css compiler
  nunjucks = require("gulp-nunjucks"), // gulp compile nunjucks templates
  data = require("gulp-data"), // gulp data converter to nunjucks
  fs = require("fs"), // file system
  path = require("path"); // file path

// Configuration
var configuration = {
  paths: {
    src: {
      html: "./app/*.html",
      css: "./app/css/styles.css",
      scss: "./app/scss/**/*.scss",
      parts: "./app/parts/*.njk",
      js: "./app/js/**/*.js",
      data: "./app/data/*.json",
      assets: "./app/assets/*.png"
    },
    dist: "./dist"
  },
  localServer: {
    port: 8001,
    url: "http://localhost:8001/"
  }
};

// Gulp task to copy HTML files to output directory and complie Nunjucks templates
gulp.task("html", function() {
  gulp
    .src(configuration.paths.src.html)
    .pipe(
      data(function(file) {
        return JSON.parse(
          fs.readFileSync("./app/data/" + path.basename(file.path) + ".json")
        );
      })
    )
    .pipe(nunjucks.compile())
    .pipe(gulp.dest(configuration.paths.dist))
    .pipe(connect.reload());
});

gulp.task("assets", () => {
  return gulp
    .src(configuration.paths.src.assets)
    .pipe(gulp.dest(configuration.paths.dist + "/assets"))
    .pipe(connect.reload());
});

// Gulp task to convert SASS to CSS
gulp.task("scss", function() {
  return gulp
    .src(configuration.paths.src.scss)
    .pipe(sass())
    .pipe(gulp.dest("app/css"));
});

// Gulp task to concatenate our css files
gulp.task("css", ["scss"], function() {
  gulp
    .src(configuration.paths.src.css)
    .pipe(gulp.dest(configuration.paths.dist + "/css"))
    .pipe(connect.reload());
});

// Gulp task to concatenate our js files
gulp.task("js", function() {
  gulp
    .src(configuration.paths.src.js)
    .pipe(gulp.dest(configuration.paths.dist + "/js"))
    .pipe(connect.reload());
});

// Gulp task to create a web server
gulp.task("connect", function() {
  connect.server({
    root: "dist",
    port: configuration.localServer.port,
    livereload: true
  });
});

// Gulp task to open the default web browser
gulp.task("open", function() {
  gulp
    .src("dist/index.html")
    .pipe(open({ uri: configuration.localServer.url }));
});

// Watch the file system and reload the website automatically
gulp.task("watch", function() {
  gulp.watch(configuration.paths.src.html, ["html"]);
  gulp.watch(configuration.paths.src.scss, ["scss"]);
  gulp.watch(configuration.paths.src.css, ["css"]);
  gulp.watch(configuration.paths.src.js, ["js"]);
  gulp.watch(configuration.paths.src.parts, ["html"]);
  gulp.watch(configuration.paths.src.data, ["html"]);
  gulp.watch(configuration.paths.src.assets, ["assets"]);
});

// Gulp default task
gulp.task("default", [
  "html",
  "css",
  "js",
  "assets",
  "connect",
  "open",
  "watch"
]);
