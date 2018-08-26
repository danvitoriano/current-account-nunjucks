// Add our dependencies
var gulp = require("gulp"), // Main Gulp module
  concat = require("gulp-concat"), // Gulp File concatenation plugin
  open = require("gulp-open"), // Gulp browser opening plugin
  connect = require("gulp-connect"), // Gulp Web server runner plugin
  sass = require("gulp-sass");

// Configuration
var configuration = {
  paths: {
    src: {
      html: "./app/*.html",
      css: "./app/css/styles.css",
      scss: "./app/scss/styles.scss",
      js: "./app/js/todo.js"
    },
    dist: "./dist"
  },
  localServer: {
    port: 8001,
    url: "http://localhost:8001/"
  }
};

// Gulp task to copy HTML files to output directory
gulp.task("html", function() {
  gulp
    .src(configuration.paths.src.html)
    .pipe(gulp.dest(configuration.paths.dist))
    .pipe(connect.reload());
});

// Gulp task to convert SASS to CSS
gulp.task("scss", function() {
  return gulp
    .src("app/scss/**/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("app/css"));
});

// Gulp task to concatenate our css files
gulp.task("css", ["scss"], function() {
  gulp
    .src(configuration.paths.src.css)
    // .pipe(concat("site.css"))
    .pipe(gulp.dest(configuration.paths.dist + "/css"))
    .pipe(connect.reload());
});

// Gulp task to concatenate our js files
gulp.task("js", function() {
  gulp
    .src(configuration.paths.src.js)
    // .pipe(concat("site.js"))
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
});

// Gulp default task
gulp.task("default", ["html", "css", "js", "connect", "open", "watch"]);
