import gulp from "gulp";
import sass from "gulp-sass";
import * as dartSass from "sass";
import cleanCSS from "gulp-clean-css";
import rename from "gulp-rename";
import clean from "gulp-clean";
import uglify from "gulp-uglify";
import nunjucksRender from "gulp-nunjucks-render";
import browserSync from "browser-sync";

const bs = browserSync.create();

const paths = {
  src: "src/templates/index.njk",
  dest: "dist/",
  scripts: {
    src: "src/scripts/**/*.js",
    dest: "dist/js/",
  },
  images: {
    src: "src/images/**/*",
    dest: "dist/images/",
  },
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
    .src([
      "./src/scss/cards.scss",
      "./src/scss/styles.scss",
      "./src/scss/card-price.scss",
    ])
    .pipe(sassCompiler().on("error", sassCompiler.logError))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("./dist/css"));
};

function copyImages() {
  return gulp
    .src(paths.images.src, { encoding: false })
    .pipe(gulp.dest(paths.images.dest))
    .pipe(bs.stream());
}

function minifyJS() {
  return gulp
    .src(paths.scripts.src)
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(bs.stream());
}

const watchFiles = () => {
  gulp.watch("./src/scss/**/*.scss", compileSass);
  gulp.watch("src/templates/index.njk", templates);
  gulp.watch("src/templates/**/*.njk", templates);
  gulp.watch(paths.images.src, copyImages);
  gulp.watch(paths.scripts.src, minifyJS);
};

export { compileSass, copyImages, minifyJS, watchFiles };

export default gulp.series(
  cleanDist,
  templates,
  compileSass,
  copyImages,
  minifyJS,
  watchFiles
);
