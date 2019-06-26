"use strict";

const gulp = require('gulp');
const autoprefixer = require('autoprefixer');
const babel = require('gulp-babel');
const browsersync = require("browser-sync").create();
const cssnano = require("cssnano");
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const handlebars = require('gulp-compile-handlebars');
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const rename = require('gulp-rename');
const dir = require('node-dir');
const del = require('del');
const eslint = require("gulp-eslint");
const htmlbeautify = require('gulp-html-beautify');
const useref = require('gulp-useref');
const gulpIf = require('gulp-if');
const uglify = require('gulp-uglify');
// const webpack = require("webpack");
// const webpackconfig = require("./webpack.config.js");
// const webpackstream = require("webpack-stream");

const path = {
  root: './',
  src: {
    root: 'design/src',
    font: 'design/src/fonts',
    img: 'design/src/img',
    js: 'design/src/js',
    samples: 'design/src/samples',
    sass: 'design/src/sass',
    template:  'design/src/templates'
  },
  dist: {
    root: 'design/dist',
    font: 'design/dist/fonts',
    img: 'design/dist/img',
    js: 'design/dist/js',
    samples: 'design/dist/samples',
    css: 'design/dist/css'
  },
  app: 'app'
};
const files = {
  types: 'ico,jpg,png,gif,svg,ico,txt,xml,ttf,woff,woff2,eot'
};

// BrowserSync (callback)
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: path.dist,
    },
    port: 8080,
    startPath: 'index.html'
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Clean assets
function clean() {
  return del([
    path.dist.root
  ]);
}

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded' //expanded compressed
};
// CSS task
var autoprefixerOptions = {
  browsers: ['last 5 versions', '> 5%', 'Firefox ESR']
};
function css() {
  return gulp
    .src(path.src.sass+'/**/*.+(scss|sass)')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(gulp.dest(path.dist.css))
    .pipe(rename({ suffix: ".min" }))
    .pipe(postcss([autoprefixer(autoprefixerOptions), cssnano()]))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(path.dist.css))
    .pipe(browsersync.stream())
}
function copyFiles(done) {
  gulp.src([
    path.src.root+'/*.{ico,jpg,png,gif,txt,xml,webmanifest}',
    '!'+path.src.root+'/*.+(zip|rar|psd|ai|pdf)'
  ])
  .pipe(gulp.dest(path.dist.root))

  gulp.src([
    // path.root+'node_modules/bootstrap/dist/js/bootstrap.js',
    // path.root+'node_modules/jquery/dist/jquery.js',
    // path.root+'node_modules/popper.js/dist/umd/popper.js',
    path.src.js+'/**/*.js'
  ])
  .pipe(gulp.dest(path.dist.js))

  gulp.src([
    path.src.font+'/**/*',
    path.root+'node_modules/font-awesome/fonts/*',
    '!'+path.src.font+'/**/*.+(html|css)'
  ])
  .pipe(gulp.dest(path.dist.font))

  gulp.src([
    path.src.samples+'/**/*.{png,jpg,gif,svg,ico}'
  ])
  .pipe(gulp.dest(path.dist.samples))

  gulp.src([
    path.src.img+'/**/*.{png,jpg,gif,svg,ico}'
  ])
  .pipe(gulp.dest(path.dist.img))

  done();
}

function hbs(done) {
  var partialsDir = path.src.root+'/templates/partials';

  //options do beautify
  var beautifyOptions = {
    indentSize: 2
  };

  var subdirsList = dir.subdirs(partialsDir, function(err, subdirs) {
    if (err) {
      throw err;
    } else {
      //console.log(subdirs);
      var batchList = subdirs;
      batchList.push('./'+path.src.root+'/templates/partials/');

      var content = require('./'+path.src.root+'/templates/data/main.json');
      var helper = require('./'+path.src.root+'/templates/helpers/main-helper.js');
      var options = {
        //ignorePartials: true,
        // partials : {
        //   footer : '<footer>the end</footer>'
        // },
        batch: batchList,
        helpers : { //helper
          'raw-helper' : function(options) {
            return options.fn();
          }
        }
      }
      return gulp.src([
          path.src.root+'/templates/pages/**/*.hbs'
        ])
        .pipe(handlebars(content, options))
        .pipe(htmlbeautify(beautifyOptions))
        .pipe(rename({extname: '.html'}))
        //.pipe(useref())
        .pipe(gulp.dest(path.dist.root))
        .pipe(browsersync.reload({
          stream: true
        }))
    }
  });
  done();
}

function assetsBundle(done) {
  return gulp
    .src(path.dist.root+'/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest(path.dist.root));
  done();
}

// Lint scripts
function scriptsLint() {
  return gulp
    .src([path.src.js+'/**/*.js'])
    .pipe(plumber())
    .pipe(eslint({configFile: './eslint.config.json'}))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

// Transpile, concatenate and minify scripts
function scripts() {
  return (
    gulp
      .src([path.src.js+'/**/*.js'])
      .pipe(plumber())
      .pipe(babel({
        presets: ['@babel/env']
      }))
      //.pipe(uglify())
      //.pipe(webpackstream(webpackconfig, webpack))
      // folder only, filename is specified in webpack config
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(path.dist.js))
      .pipe(browsersync.stream())
  );
}

// Jekyll
function jekyll() {
  return cp.spawn("bundle", ["exec", "jekyll", "build"], { stdio: "inherit" });
}

// Watch files
function watchFiles() {
  gulp.watch(path.src.sass, css).on('change', function(path, stats) {
    console.log(path);
  });
  gulp.watch([
    path.src.template+'/**/*.hbs',
    path.src.template+'/data/**/*.*'
  ], hbs);

  //gulp.watch(path.dist.root+'/*.html', assetsBundle);

  gulp.watch(path.src.js+'/**/*.js', gulp.series(scriptsLint, scripts));

  gulp.watch([
    path.src.root+'**/*.{'+files.types+'}',
    '!'+path.src.root+'**/*.+(zip|rar|psd|ai|pdf)'
  ], copyFiles);

  //global watch
  gulp.watch(
    [
      path.src.fonts+'/**/*',
      path.dist.root+'/**/*.js',
      path.dist.root+'/**/*.[html|css]',
      '!'+path.src.root+'/fonts/**/*.+(html|css)',
      '!'+path.app+'/**/*.html',
      '!'+path.app+'/**/*.js',
      '!'+path.app+'/directives/**/*.min.js',
      '!'+path.app+'/directives/**/*.min.js',
      '!'+path.app+'/components/**/*.*'
    ],
    gulp.series(browserSyncReload)
  );
  //gulp.watch("./assets/img/**/*", images);
}

// define complex tasks
const js = gulp.series(scriptsLint, scripts);
const build = gulp.series(clean, gulp.parallel(css, hbs, js, copyFiles));
const watch = gulp.series(build, gulp.parallel(watchFiles, assetsBundle, browserSync));

// export tasks
exports.assetsBundle = assetsBundle;
exports.copyFiles = copyFiles;
exports.hbs = hbs;
exports.css = css;
exports.js = js;
exports.jekyll = jekyll;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = watch;