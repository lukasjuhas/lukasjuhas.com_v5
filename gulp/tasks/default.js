var gulp = require('gulp');
var browerSync = require('browser-sync');
var config = require('../config');

gulp.task('default', ['markup', 'browserify', 'libs', 'libs', 'scss', 'images'], function() {

  gulp.watch(config.scss.watchSrc, ['scss']);
  gulp.watch(config.markup.src, ['markup']);
  gulp.watch(config.images.src, ['images']);

  browerSync(config.browserSync);

});
