const gulp = require("gulp");
const nunjucks = require("gulp-nunjucks");

gulp.task("default", () =>
  gulp
    .src("index.html")
    .pipe(
      nunjucks.compile({
        page_title: "Cool Product",
        features: [
          {
            name: "Speed",
            description: "It's fast."
          },
          {
            name: "Reliability",
            description: "You can count on it."
          },
          {
            name: "Security",
            description: "You don't have to worry about it."
          }
        ],
        colors: [
          {
            color_name: "brandColor",
            color_value: "#f06d06",
            color_notes: "Our main color."
          },
          {
            color_name: "brandHighlight",
            color_value: "#d0b000",
            color_notes: "For callouts and highlights."
          },
          {
            color_name: "grayDark",
            color_value: "#333333",
            color_notes: "For things like code block backgrounds."
          }
        ]
      })
    )
    .pipe(gulp.dest("dist"))
);
