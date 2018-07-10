var gulp = require('gulp');
var sass = require('gulp-sass');
var header = require('gulp-header');
var connect = require('gulp-connect');
var imagemin = require('gulp-imagemin');
var pkg = require('./package.json');

// Set the banner content
var banner = ['/*!\n',
    ' * Tingleware Developers - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright ' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license %> (https://github.com/nelsonmfinda/<%= pkg.name %>/blob/master/LICENSE)\n',
    ' */\n',
    ''
].join('');

//style paths
var ficheirosSass = 'src/sass/**/*.scss',
    destino = 'assets/css/';

// Start a development webserver.
gulp.task('webserver', function () {
    connect.server({
        livereload: true,
        root: '.'
    });
});

gulp.task('styles', function () {
    gulp.src(ficheirosSass)
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(gulp.dest(destino))
        .pipe(connect.reload());
});

gulp.task('imagemin', function () {
    gulp.src('assets/images/**/*{.png,.jpg,.jpeg,.gif,.svg}')
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 5
        }))
        .pipe(gulp.dest('assets/images/'))
});

gulp.task('watch', function () {
    gulp.watch(ficheirosSass, ['styles'])
    gulp.watch('src/img/**', ['imagemin'])
    connect.reload();
});

gulp.task('default', ['styles', 'imagemin', 'webserver', 'watch']);