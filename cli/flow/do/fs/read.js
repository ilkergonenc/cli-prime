const Vinyl = require('vinyl')
const fs = require('vinyl-fs')

const read = {
  src: (_src) => { 
    if (!_src.globs) return fs.src(_src)
    else return fs.src(_src.globs, _src.opt)
  },
  read: (file, _log) => {
    file = new Vinyl(file)
    if(_log) read.readFile(file)
    return file
  },
  readFile: (file) => {
    console.log('VINYL FILE PROPERTIES')
    console.log('vinyl path:      ', file.path)
    console.log('vinyl dirname:   ', file.dirname)
    console.log('vinyl base:      ', file.base)
    console.log('vinyl cwd:       ', file.cwd)
    console.log('vinyl relative:  ', file.relative)
    console.log('vinyl basename:  ', file.basename)
    console.log('vinyl stem:      ', file.stem)
    console.log('vinyl extname:   ', file.extname)
    // console.log('vinyl contents:  ', file.contents)
  }
}

module.exports = read