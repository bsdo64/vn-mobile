const path = require('path');
const gulp = require('gulp');
const pump = require('pump');
const cache = require('gulp-cached');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const eslint = require('gulp-eslint');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const runSequence = require('run-sequence');

const root = __dirname;
const bowerSrc = __dirname + '/bower_components';
const distSrc = __dirname + '/dist';
const nodeModuleSrc = __dirname + '/node_modules';

gulp.task('concat-js', function() {
  return gulp
    .src([
      bowerSrc + '/jquery/dist/jquery.min.js',
      distSrc + '/semantic/semantic.min.js',
      bowerSrc + '/medium-editor/dist/js/medium-editor.min.js',
      bowerSrc + '/handlebars/handlebars.runtime.min.js',
      bowerSrc + '/jquery-sortable/source/js/jquery-sortable-min.js',
      bowerSrc + '/blueimp-file-upload/js/vendor/jquery.ui.widget.js',
      bowerSrc + '/blueimp-file-upload/js/jquery.iframe-transport.js',
      bowerSrc + '/blueimp-file-upload/js/jquery.fileupload.js',
      bowerSrc + '/medium-editor-insert-plugin/dist/js/medium-editor-insert-plugin.min.js'
    ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(root + '/dist'));
});

gulp.task('concat-css', function() {
  return gulp
    .src([
      bowerSrc + '/normalize-scss/normalize.css',
      distSrc + '/semantic/semantic.min.css',
      bowerSrc + '/font-awesome/css/font-awesome.min.css',
      bowerSrc + '/medium-editor/dist/css/medium-editor.min.css',
      bowerSrc + '/medium-editor/dist/css/themes/default.min.css',
      bowerSrc + '/medium-editor-insert-plugin/dist/css/medium-editor-insert-plugin.min.css',
      distSrc + '/stylesheets/common.css',
      distSrc + '/stylesheets/react-select.min.css',
      distSrc + '/stylesheets/react-datepicker.min.css',
      nodeModuleSrc + '/highlight.js/styles/androidstudio.css'
    ])
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest(root + '/dist'));
});

gulp.task('compress-js', function (cb) {
  pump([
      gulp.src('dist/vendor.js'),
      uglify(),
      gulp.dest('dist')
    ],
    cb
  );
});

gulp.task('minify-css', function() {
  return gulp.src('dist/vendor.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('dist'));
});

gulp.task('font-awesome-font', function() {
  return gulp.src(bowerSrc + '/font-awesome/fonts/**/*.*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('semantic-themes', function() {
  return gulp.src(distSrc + '/semantic/themes/**/*.*')
    .pipe(gulp.dest('dist/themes'));
});

gulp.task('clean', function () {
  return del(['dist/vendor.css', 'dist/vendor.js', 'dist/themes']);
});


gulp.task('cached-lint', () => {
  // Read all js files within test/fixtures
  return gulp.src('./src/**/*.js')
    .pipe(cache('eslint'))
    // Only uncached and changed files past this point
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.result(result => {
      if (result.warningCount > 0 || result.errorCount > 0) {
        // If a file has errors/warnings remove uncache it
        delete cache.caches.eslint[path.resolve(result.filePath)];
      }
    }));
});

// Run the "cached-lint" task initially...
gulp.task('cached-lint-watch', ['cached-lint'], () => {
  // ...and whenever a watched file changes
  return gulp.watch('./src/**/*.js', ['cached-lint'], event => {
    if (event.type === 'deleted' && cache.caches.eslint) {
      // remove deleted files from cache
      delete cache.caches.eslint[event.path];
    }
  });
});

gulp.task('default', ['clean'], function (done) {
  runSequence('concat-js', 'concat-css', 'minify-css', 'compress-js', 'font-awesome-font', 'semantic-themes', function () {
    console.log('all done');
    done();
  })
});
