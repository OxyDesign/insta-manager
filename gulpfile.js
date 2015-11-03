var gulp = require('gulp'),
    connect = require('gulp-connect'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');

// Server
gulp.task('webserver', function() {
  connect.server({
    root: ['dist/']
  });
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest('dist/js/'));
});

// Styles
gulp.task('styles', function() {
  return gulp.src('src/sass/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist/css/'));
});

// Default task
gulp.task('default', function() {
  gulp.start('webserver');
  gulp.watch('src/js/*.js', ['scripts']);
  gulp.watch('src/sass/*.scss', ['styles']);
});


