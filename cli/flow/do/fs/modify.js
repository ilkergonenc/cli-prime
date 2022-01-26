// const concat = require('gulp-concat')
// const rename = require('gulp-rename')
// const replace = require('gulp-replace')

const modify = {
  concat:   concat   =>  require('gulp-concat')(concat),
  rename:   rename   =>  require('gulp-rename')(rename),
  replace:  replace  =>  require('gulp-replace')(replace.find, replace.change),
}

module.exports = modify