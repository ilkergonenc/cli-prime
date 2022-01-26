const pkg = (name) => {

  const packages = {
    
    sourcemaps: require('gulp-sourcemaps'),
    beautify: require('gulp-beautify'),

    sass: require('gulp-sass'),
    nodesass: require('node-sass'),
    postcss: require('gulp-postcss'),
    autoprefixer: require('autoprefixer'),
    cssnano: require('gulp-cssnano'),

    rollup: require('rollup'),
    babel: require('rollup-plugin-babel'),
    terser: require('gulp-terser'),

    data: require('gulp-yaml-data'),
    pug: require('gulp-pug'),

    filelist: require('gulp-filelist'),
    map: require('map-stream'),
    dTree: require('gulp-directory-map')


  }

  return packages[name]

}

module.exports = pkg