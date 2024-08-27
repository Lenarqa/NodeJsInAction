const gulp = require("gulp");
const watch = require("gulp-watch");

exports.development = gulp.task("watch", () => {
  watch("./app/**.jsx", gulp.series("default"));
});
