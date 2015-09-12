var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var config = require('../../config').scss;
var autoprefixer = require('gulp-autoprefixer');

gulp.task('scss', function() {
  return gulp.src(config.src)
    .pipe(sass({
      errLogToConsole: true,
    }))
    .pipe(sourcemaps.init())
    .pipe(sass(config.settings))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer({
      browsers: ['last 2 version'],
    }))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({
      stream: true,
    }));
});

gulp.task('scssDeploy', function() {
  return gulp.src(config.src)
    .pipe(sass(config.deploySettings));
});
