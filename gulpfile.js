const SASS_AUTOPREFIXER_OPTIONS = {
  browsers: [
    'last 2 versions',
    'not ie <= 10',
    'not ie_mob <= 10',
  ],
  cascade: false,
};


const HTML_MINIFIER_OPTIONS = {
  collapseWhitespace: true,
  removeComments: true,
  caseSensitive: true,
  removeAttributeQuotes: false
};

const gulp = require('gulp');
const inlineResources = require('./scripts/gulp/inline-resources');
const sass = require('gulp-sass');
const gulpSass = require('gulp-sass');
const gulpSourcemaps = require('gulp-sourcemaps');
const gulpAutoprefixer = require('gulp-autoprefixer');
const gulpMinifyCss = require('gulp-clean-css');
const gulpMinifyHtml = require('gulp-htmlmin');

gulp.task('copy-and-inline-resource', copyHtml);

function copyHtml() {
  gulp.src('src/lib/**/*.html')
    .pipe(gulpMinifyHtml(HTML_MINIFIER_OPTIONS))
    .pipe(gulp.dest('./dist/')).on('end', buildCss);
}

function buildCss() {
  //noinspection JSUnresolvedFunction
  gulp.src('./src/lib/**/*.scss').
  pipe(gulpSourcemaps.init()).pipe(gulpSass().on('error', gulpSass.logError))
    .pipe(gulpAutoprefixer(SASS_AUTOPREFIXER_OPTIONS))
    .pipe(gulpSourcemaps.write('.'))
    .pipe(gulpMinifyCss())
    .pipe(gulp.dest('./dist/'))
    .on('end', copyScss);
}

function copyScss () {
  gulp.src('./src/lib/**/*.scss')
    .pipe(gulp.dest('./dist/')).on('end', copyPackage);
}

function copyPackage () {
  gulp.src('./package.json')
    .pipe(gulp.dest('./dist/')).on('end', inlineResource);
}

function inlineResource() {
  inlineResources('./dist/');
}

gulp.task('default', ['copy-and-inline-resource']);
