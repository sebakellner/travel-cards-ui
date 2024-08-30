import gulp from "gulp";
import sass from "gulp-sass";
import * as dartSass from "sass";
import cleanCSS from "gulp-clean-css";
import rename from "gulp-rename";
import clean from "gulp-clean";

const sassCompiler = sass(dartSass);

function cleanCSSDirectory() {
  return gulp.src("dist/css", { read: false, allowEmpty: true }).pipe(clean());
}

const compileSass = () => {
  return gulp
    .src(["./src/scss/cards.scss", "./src/scss/styles.scss"])
    .pipe(sassCompiler().on("error", sassCompiler.logError))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("./dist/css"));
};

const watchFiles = () => {
  gulp.watch("./src/scss/**/*.scss", compileSass);
};

export { compileSass, watchFiles };

export default gulp.series(cleanCSSDirectory, compileSass, watchFiles);
