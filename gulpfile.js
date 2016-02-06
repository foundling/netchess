var gulp = require('gulp');
var webpack = require('webpack-stream');
var jsonlint = require('gulp-json-lint');

gulp.task('jsonlint', function() {
  return gulp.src('package.json')
    .pipe(jsonlint())
    .pipe(jsonlint.report('verbose'));
});

gulp.task('webpack:dev', function() {
  return gulp.src('./app.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('styles:dev', function(){
  return gulp.src('./css/style.css')
    .pipe(gulp.dest('build/'));
});

gulp.task('staticfiles:dev', function() {
  return gulp.src('./index.html')
    .pipe(gulp.dest('build/'));
});

gulp.task('build:dev', ['jsonlint', 'styles:dev', 'staticfiles:dev', 'webpack:dev']);
gulp.task('default', ['build:dev']);
