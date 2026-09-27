var gulp = require('gulp');
var gTsc = require('gulp-typescript');
var tsProject = gTsc.createProject('tsconfig.json');
var browserSync = require('browser-sync').create();
var protractor = require('gulp-protractor').protractor;
var webdriver = require('gulp-protractor').webdriver_update;

gulp.task('e2e-serve', function () {
    browserSync.init({
        server: './dist',
        port: 3000,
        online: false
    });
    gulp.watch(['src/**/*.ts', 'src/**/*.css', 'src/**/*.html'], gulp.series('e2e-build', function (done) {
        browserSync.reload();
        done();
    }));
});

gulp.task('e2e-build', function () {
    return tsProject.src()
        .pipe(gTsc())
        .pipe(gulp.dest('dist'));
});

gulp.task('e2e-test', function () {
    return gulp.src('e2e/**/*.ts')
        .pipe(protractor({ configFile: 'e2e/protractor.config.js' }));
});

gulp.task('e2e-webdriver-update', webdriver);
