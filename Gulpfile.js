var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var deploy      = require('gulp-gh-pages');
var runSequence = require('run-sequence');
var $ = require('gulp-load-plugins')({
      pattern: ['gulp-*', 'del', 'main-bower-files']
    });

///////////BABEL//////////////////
gulp.task('js:dev', function () {
  return gulp
    .src(['src/**/*.js', 'src/*.js', 'src/**/**/*.js'])
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('public'));
});

// gulp.task('js:prod', function () {
//   return gulp
//     .src(['src/**/*.js', 'src/*.js', 'src/**/**/*.js'])
//     .pipe($.sourcemaps.init())
//     .pipe($.babel())
//     .pipe($.uglify())
//     .pipe($.sourcemaps.write('.'))
//     .pipe(gulp.dest('public'))
// });

//////////////BOWER///////////////
gulp.task('bower', function () {
  return gulp
    .src($.mainBowerFiles([['**/*.js']]))
    .pipe($.concat('build.js'))
    .pipe(gulp.dest('public/lib'));
  return gulp
    .src($.mainBowerFiles([['**/*.css']]))
    .pipe($.concat('build.css'))
    .pipe(gulp.dest('public/lib'));
});

/////////////CLEAN//////////////////
gulp.task('clean', function () {
   $.del('public')
});

///////////////COPY////////////////// trying to copy CNAME. May need to add up top
// gulp.task('copy', function () {
//   gulp.src(['/src/CNAME'])
//   .pipe(gulp.dest('./public/'))
// });

/////////////DEPLOY/////////////////
// gulp.task('deploy', function () {
//   return gulp.src("./public/**/*")
//     .pipe(deploy())
// });

///////////////JADE////////////////
gulp.task('jade:dev', function () {
  return gulp
    .src(['src/**/*.jade', '!src/**/_*.jade'])
    .pipe($.jade({
      pretty: true
    }))
    .pipe(gulp.dest('public'));
});

// gulp.task('jade:prod', function () {
//   return gulp
//     .src(['src/**/*.jade', '!src/**/_*.jade'])
//     .pipe($.jade())
//     .pipe(gulp.dest('public'));
// });

///////////////SASS///////////////////
gulp.task('sass:dev', function () {
  return gulp
    .src('src/**/main.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.sourcemaps.write())
    .pipe($.autoprefixer('last 2 version'))
    .pipe(gulp.dest('public'))
    .pipe(browserSync.stream())
});

// gulp.task('sass:prod', function () {
//   return gulp
//     .src('src/**/main.scss')
//     .pipe($.sass({
//         outputStyle: 'compressed'
//       })
//       .on('error', $.sass.logError)
//     )
//     .pipe($.autoprefixer('last 2 version'))
//     .pipe(gulp.dest('public'))
// });

///////////////UGLIFY OR COMPRESS////////////////
// gulp.task('compress', function() { //not working.
//   return gulp.src('public/lib/*.js')
//     .pipe($.uglify())
//     .pipe(gulp.dest('public/lib'));
// });


//trying the runsequence for dev
gulp.task('build:dev', ['clean'], function(callback) {
  runSequence([
        'jade:dev',
        'sass:dev',
        'js:dev',
        'bower'
      ],
      [
        'serve'
      ],
        callback);
});

gulp.task('build', ['clean', 'jade:dev', 'sass:dev', 'js:dev', 'bower'])

gulp.task('build:prod', ['clean'], function(callback) {
  runSequence([
        'jade:prod',
        'sass:prod',
        'js:prod',
        'bower'
      ],
      [
        'compress'
      ],
      [
        'serve'
      ],
        callback);
});

//SERVER AND WATCH
gulp.task('serve', function () {
  browserSync.init({
      server: {
        baseDir: "public/"
      }
    });
  gulp.watch(['src/**/*.jade', 'src/**/**/*.jade'], ['jade:dev']).on('change', browserSync.reload)
  gulp.watch(['src/**/*.scss', 'src/**/**/*.scss'], ['sass:dev']).on('change', browserSync.reload)
  gulp.watch(['src/**/*.js', 'src/**/**/*.js'], ['js:dev']).on('change', browserSync.reload)
});

gulp.task('default', function() {});
