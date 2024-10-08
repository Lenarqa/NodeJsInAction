const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const concut = require("gulp-concat");

exports.production = gulp.task("default", () => {
  return gulp
    .src("app/*.jsx")
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["es2015", "react"],
      })
    )
    .pipe(concut("all.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"));
});
