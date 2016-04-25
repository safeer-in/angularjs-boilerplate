var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    sass = require('gulp-sass'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    expect = require('gulp-expect-file');


gulp.task('default', ['webserver', 'watch']);

gulp.task('sass', function() {
    gulp.src('src/styles/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('assets/css'))
        .pipe(livereload())
        .pipe(notify({
            message: 'Sass compile completed'
        }));
});

gulp.task('static-html', function() {
    gulp.src('src/static/**/*.html')
        .pipe(livereload());
});

gulp.task('vendor-scripts', function() {
    var file_prefix = 'src/components/';
    var files = [
        file_prefix + 'angular/angular.min.js',
        file_prefix + 'angular-ui-router/release/angular-ui-router.min.js',
        file_prefix + 'jquery/dist/jquery.min.js',
        file_prefix + 'bootstrap/dist/js/bootstrap.min.js',
        file_prefix + 'lodash/dist/lodash.min.js'
    ];
    return gulp.src(files)
        .pipe(expect(files))
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('assets/js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js'))
        .pipe(notify({
            message: 'Vendor Scripts task complete'
        }));
});


gulp.task('scripts', ['vendor-scripts']);

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('src/styles/**/*.sass', ['sass']);
    gulp.watch('src/static/**/*.html', ['static-html']);
});

gulp.task('webserver', function() {
    connect.server({
        livereload: true
    });
});