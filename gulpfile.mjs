import gulp from "gulp";
import sass from "gulp-sass";
import * as dartSass from "sass";
import cleanCSS from "gulp-clean-css";
import rename from "gulp-rename";
import clean from "gulp-clean";
import nunjucksRender from "gulp-nunjucks-render";
import browserSync from "browser-sync";

const bs = browserSync.create();

const paths = {
  src: "src/templates/index.njk",
  dest: "dist/",
};

function templates() {
  return gulp
    .src(paths.src)
    .pipe(
      nunjucksRender({
        path: ["src/templates/"],
      })
    )
    .pipe(gulp.dest(paths.dest))
    .pipe(bs.stream());
}

const sassCompiler = sass(dartSass);

function cleanDist() {
  return gulp.src(paths.dest, { read: false, allowEmpty: true }).pipe(clean());
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
  gulp.watch("src/templates/index.html", templates);
  gulp.watch("src/templates/**/*.html", templates);
};

export { compileSass, watchFiles };

export default gulp.series(cleanDist, templates, compileSass, watchFiles);
