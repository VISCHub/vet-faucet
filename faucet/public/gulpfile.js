'use strict';

const fs = require('fs');
const gulp = require('gulp');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const uglifycss = require('gulp-uglifycss');
const include = require('gulp-include');
const addsrc = require('gulp-add-src');
const order = require('gulp-order');
const concat = require('gulp-concat');
const concatCss = require('gulp-concat-css');
const uglify = require('gulp-uglify');
const replace = require('gulp-replace');

// Get config
const configPath = '../../configs/config.json';
const configExists = fs.existsSync(configPath, fs.F_OK);
if (configExists !== true) {
  console.error("Could not find the file " + configPath);
  process.exit(-1);
}
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

gulp.task( 'default', function() {
  gulp.start('sass');
  gulp.start('javascript');
  gulp.start('watch');
});

gulp.task('sass', function() {
  return gulp.src([
    'assets/stylesheets/*.scss',
    './assets/stylesheets/sweetalert2.min.css'
    ])
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(concatCss('application.css'))
    .pipe(uglifycss())
    .pipe(gulp.dest('assets/stylesheets/'));
});

gulp.task('javascript', function() {
  return gulp.src('assets/javascripts/application/*.js')
    .pipe(addsrc('assets/javascripts/vendor/index.js'))
    .pipe(order([
      "assets/javascripts/vendor/index.js",
      "assets/javascripts/application/*.js"
    ], {base: '.'}))
    .pipe(include())
    .pipe(concat('application.js'))
    .pipe(replace(/REQUEST_X_ETH/g, config.Ethereum.etherToTransfer))
    .pipe(uglify())
    .pipe(gulp.dest('assets/javascripts'));
});

gulp.task('watch', function() {
  gulp.watch('assets/stylesheets/**/**/*.scss', ['sass']);
  gulp.watch('assets/javascripts/application/*.js', ['javascript']);
});
