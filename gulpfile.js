// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./app/",
            index: "./index.html"
        }
    });
});

// Watch Files For Changes
gulp.task('watch', ['browser-sync'], function() {
    gulp.watch('app/*.js').on('change', browserSync.reload);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

// Default Task
gulp.task('default', ['watch']);
