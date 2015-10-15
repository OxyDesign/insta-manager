var gulp = require('gulp'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

// Scripts
gulp.task('scripts', function() {
  return gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest('dist/js/'));
});

// Default task
gulp.task('default', function() {
  gulp.watch('src/js/*.js', ['scripts']);
});


