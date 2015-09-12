var gulp = require('gulp');
var browerSync = require('browser-sync');
var config = require('../config');

gulp.task('product', function() {
  gulp.start(['markup-product', 'images-product', 'minify-css', 'uglify-js']);
});
