/**
 * Created by Pavel on 9.3.14.
 */
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
    gulp.src('../Frontend/styles/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('../Frontend/styles/application.css'));
});
