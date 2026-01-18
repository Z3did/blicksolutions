const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const terser = require('gulp-terser-js');

const src = { 'js': './src/js/*.js', 'css': './src/styles/*.scss' };
const dest = './assets';


const css = () => {
    return gulp.src( src.css )
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write(''))
        .pipe(gulp.dest( dest ));
};

const script = () => {
    return gulp.src( src.js )
        .pipe(terser())
        .pipe(gulp.dest( dest ));
};

const watch = () => gulp.watch(
    [ src.css, src.js ],
    gulp.series(css, script));

const dev = gulp.series( css, script, watch);

const build = gulp.series( css, script );

exports.default = dev;
exports.dev = dev;
exports.build = build;