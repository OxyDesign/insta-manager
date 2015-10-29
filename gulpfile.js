var gulp = require('gulp'),
    connect = require('gulp-connect'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

// Server
gulp.task('webserver', function() {
  connect.server({
    root: ['./']
  });
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest('dist/js/'));
});

// Default task
gulp.task('default', function() {
  gulp.start('webserver');
  gulp.watch('src/js/*.js', ['scripts']);
});


