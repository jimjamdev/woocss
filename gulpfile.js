'use strict';
// generated on 2014-11-24 using generator-gulp-webapp 0.1.0

var gulp = require('gulp');

// load plugins
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var cmq = require('gulp-combine-media-queries');
var uncss = require('gulp-uncss');
var critical = require('critical');
var extender = require('gulp-html-extend');
var raster = require('gulp-raster');
var svgmin = require('gulp-svgmin');
var rename = require('gulp-rename');
var minifyHTML = require('gulp-minify-html');
var fileinclude = require('gulp-file-include');
var cssmin = require('gulp-cssmin');

// browser-sync task for starting the server.
gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: './app'
        }
    });
});

// or
/*
gulp.task('browser-sync', function() {
    browserSync({
        proxy: "ecenglish.local"
    });
});
*/

gulp.task('styles', function () {
    return gulp.src('app/styles/*.scss')
        //.pipe($.rubySass({
            //style: 'compressed',
            //precision: 10,
            //sourcemap: true
       //}))
        .pipe(sass())
        .pipe($.autoprefixer('last 3 version'))
        .pipe(uncss({
            html: ['app/index.html'],
            ignore: [/js/, /offcanvas/, /active/, /hover/, /scroll/, /focus/, /::?-[\w\d]+/, /mfp?-[\w\d]+/, /modal?-[\w\d]+/, /gallery-animate/, /fancy-select/, /trigger/, /options/, /slick/],
            media: ['*']
        }))
        .pipe(cmq({
            log: true
        }))
        .pipe(cssmin())
        .pipe(gulp.dest('app/styles'))
        .pipe($.size())
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('scripts', function () {
    return gulp.src('app/scripts/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter(require('jshint-stylish')))
        .pipe($.size())
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('minify-html', ['critical'], function() {
    var opts = {};
    gulp.src('dist/*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('dist'));
});

gulp.task('html', ['styles', 'scripts'], function () {
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');

    return gulp.src('app/*.html')
        .pipe(extender({annotations:true,verbose:false}))
        .pipe($.useref.assets({searchPath: '{.tmp,app}'}))
        .pipe(jsFilter)
        .pipe($.uglify())
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())
        .pipe($.useref.restore())
        .pipe($.useref())
        .pipe(gulp.dest('dist'))
        .pipe($.size())
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('fileinclude', function() {
    gulp.src('app/index.html')
    .pipe(fileinclude())
    .pipe(gulp.dest('dist'));
});


gulp.task('svg', function () {
    gulp.src('app/images/svg/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest('app/images/svg'))
        .pipe(raster())
        .pipe(rename({extname: '.png'}))
        .pipe(gulp.dest('app/images/svg/png'));
});


gulp.task('images', ['svg'], function () {
    return gulp.src('app/images/**/*')
        /*.pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))*/
        .pipe(gulp.dest('dist/images'))
        .pipe($.size());
});

gulp.task('fonts', function () {
    return gulp.src('app/**/*')
        .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
        .pipe($.flatten())
        .pipe(gulp.dest('app/fonts'))
        .pipe(gulp.dest('dist/fonts'))
        .pipe($.size());
});

gulp.task('extras', function () {
    return gulp.src(['app/*.*', '!app/*.html'], { dot: true })
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
    return gulp.src(['.tmp', 'dist'], { read: false }).pipe($.clean());
});

gulp.task('build', ['html', 'images', 'fonts', 'extras']);

gulp.task('critical', ['build'], function () {
    critical.generateInline({
        base: 'dist/',
        src: 'index.html',
        dest: 'styles/main.css',
        htmlTarget: 'index.html',
        width: 1024,
        height: 960,
        minify: true
    });
});

// Set default task on gulp. Previous "critical".
gulp.task('default', ['clean'], function () {
    gulp.start('html');
});


// inject bower components
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;

    gulp.src('app/styles/*.scss')
        .pipe(wiredep({
            directory: 'app/bower_components'
        }))
        .pipe(gulp.dest('app/styles'));

    gulp.src('app/*.html')
        .pipe(wiredep({
            directory: 'app/bower_components'
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('woo', function() {
    gulp.src('app/woo/**/*')
    .pipe(gulp.dest('woo'));
});


gulp.task('watch', ['browser-sync'], function () {

    gulp.watch('app/**/**/*.scss', ['styles']);
    gulp.watch('app/woo/**/**/*.scss', ['styles']);
    gulp.watch('app/scripts/**/*.js', ['scripts']);
    gulp.watch('app/images/**/*', ['images']);
    gulp.watch('app/svg/**/*.svg', ['svg']);
    gulp.watch('bower.json', ['wiredep']);

});
