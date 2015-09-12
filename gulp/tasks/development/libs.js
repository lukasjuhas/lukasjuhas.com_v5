var gulp = require('gulp');
var concat = require('gulp-concat-sourcemap');
var config = require('../../config').libs;
var browserSync = require('browser-sync');
var bower = require('wiredep')({

});

gulp.task('libs', function() {
  console.log(bower);
  gulp.src(bower.js)
    .pipe(concat('libs.js'))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({
      stream: true,
    }));
});
