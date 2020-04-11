const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const htmlInclude = require('gulp-file-include');
const terser = require('gulp-terser');

gulp.task('build_js', function(){
    return gulp.src('./src/javascript/*.js')
    .pipe(terser())
    .pipe(rename({suffix : '.min'}))
    .pipe(gulp.dest('./build/javascript', {overwrite : true}));
});

gulp.task('build_sass', function(){
    return gulp.src('./src/sass/*.sass')
    .pipe(gulp.src('./src/sass/*.scss'))
    .pipe(sass({ includePaths : ['./node_modules'], outputStyle : 'compressed'}))
    .pipe(rename({ suffix : '.min'}))
    .pipe(gulp.dest('./build/css', {overwrite : true}));
});


gulp.task('build_html', function(){
    return gulp.src('./src/pages/*.html')
    .pipe(htmlInclude({
        'prefix' : '@@',
        basepath : './src/pages/partials/'
    }))
    .pipe(gulp.dest('./build', {overwrite:true}));
});

gulp.task('images', function(){
    return gulp.src('./src/images/*.*')
    .pipe(gulp.dest('./build/images', {overwrite:true}));
});


//Watch Task
gulp.task('watch', function(){
    
    gulp.watch('./src/sass/*.sass', gulp.series('build_sass'));
    gulp.watch('./src/sass/*.scss', gulp.series('build_sass'));
    gulp.watch('./src/javascript/*.js', gulp.series('build_js'));
    gulp.watch('./src/pages/partials/*.html', gulp.series('build_html'));
    gulp.watch('./src/pages/*.html', gulp.series('build_html'));
    gulp.watch('./src/images/*.*', gulp.series('images'));
});

//Single Run as Default
gulp.task('default', gulp.series('build_html', 'build_sass', 'build_js', 'images'));