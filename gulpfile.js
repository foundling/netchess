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
  return gulp.src('./netchess/ui/css/*.css')
    .pipe(gulp.dest('build/'));
});

gulp.task('html:dev', function() {
  return gulp.src('./netchess/ui/index.html')
    .pipe(gulp.dest('build/'));
});

gulp.task('images:dev', function() {
  return gulp.src('./netchess/ui/img/*.png')
    .pipe(gulp.dest('build/img/'));
});

gulp.task('build:dev', ['jsonlint', 'styles:dev', 'html:dev','images:dev', 'webpack:dev']);
gulp.task('default', ['build:dev']);
