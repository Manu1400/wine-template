var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var pkg = require('./package.json');
var serve = require('gulp-serve');

// Copy vendor files from /node_modules into /vendor
// NOTE: requires `npm install` before running!
gulp.task('copy', function() {
  gulp.src([
      'node_modules/bootstrap/dist/**/*',
      '!**/npm.js',
      '!**/bootstrap-theme.*',
      '!**/*.map'
    ])
    .pipe(gulp.dest('vendor/bootstrap'))

  gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
    .pipe(gulp.dest('vendor/jquery'))
})

// Default task
gulp.task('default', ['copy']);

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: ''
    },
  })
})

// Dev task with browserSync
gulp.task('dev', ['browserSync'], function() {
  // Reloads the browser whenever HTML or CSS files change
  gulp.watch('css/*.css', browserSync.reload);
  gulp.watch('*.html', browserSync.reload);
});

gulp.task('serve', serve('public'));
gulp.task('serve-build', serve(['public', 'build', 'vendor']));
gulp.task('serve-prod', serve({
  root: ['public', 'build', 'vendor'],
  port: 443,
  https: true,
  middleware: function(req, res) {
    // custom optional middleware
  }
}));
