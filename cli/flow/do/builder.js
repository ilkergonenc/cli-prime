const pkg = require('./@pkg')
const { del, src, dest, read, rename, concat, replace } = require('./@fs')
// const log = require('../../util/@log')

const start = {
  del: del,
  src: src
}

const build = {
  read: read,
  rename: rename,
  concat: concat,
  replace: replace,

  rollup: async (stream) => {
    const rollup = pkg('rollup')
    const babel = pkg('babel')
    const bundle = await rollup.rollup({
      input: stream.src,
      plugins : [babel({
        exclude: 'node_modules/**', 
        externalHelpersWhitelist: ['defineProperties', 'createClass', 'inheritsLoose', 'defineProperty', 'objectSpread2']
      })],
      external: ['jquery'],
    });
    return bundle.write({
      file: stream.dest+'/'+stream.rollup+'.js',
      format: 'umd',
      name: stream.rollup,
      globals: {  jquery: 'jQuery' },
      sourcemap: stream.sourcemaps
    })
  },

  scss: scss => {  
    const sass = pkg('sass')
    sass.compiler = pkg('nodesass')
    return sass.sync().on('error', sass.logError)
  },
  postcss: postcss => pkg('postcss')([ pkg('autoprefixer')({cascade: true}) ]),
  
  data: yaml => pkg('data')({ property: 'data', src: yaml }),
  pug: pug => {  
    let options = { pretty: true }
    if (typeof pug === 'object') options = { ...options, pug }
    return pkg('pug')(options) 
  },

  beautify: btify => {
    const beautify = pkg('beautify')
    let options = { indent_size: 2 }
    // if (btify.opts) options = { ...options, btify.opts }
    switch (btify) {
      case 'js': return beautify.js(options) 
      case 'css': return beautify.css(options) 
      case 'html': return beautify.html(options) 
    }
  },  
  
  cssnano: () => pkg('cssnano')(),
  terser: () => pkg('terser')(),
  minify: min => {
    if (['styles', 'css', 'scss'].includes(min))  return build.cssnano()
    if (['scripts', 'js'].includes(min))          return build.terser()
  },

  filelist: fl => pkg('filelist')('filelist.json', fl),
  dTree: dTree => pkg('dTree')(dTree),
  map: map => require('map-stream')(map),
  through: thr => require('through2')({ objectMode: true }, thr),
  yaml: yaml => require('gulp-yaml')(yaml)
}

const builder = (stream, event) => {

  switch (event) {

    case 'start': 
      Object.keys(stream).forEach(pipe => { 
        if (pipe in start) event = start[pipe](stream[pipe]) 
      })
      break;

    case 'rollup': return build.rollup(stream)

    default:

      if (stream.sourcemaps)  event = event.pipe(pkg('sourcemaps').init())
      Object.keys(stream).forEach(pipe => {
        if (pipe in build)    event = event.pipe(build[pipe](stream[pipe]))
      })
      if (stream.sourcemaps)  event = event.pipe(pkg('sourcemaps').write('.'))

      event = event.pipe(dest(stream.dest))

      break;
  }

  return event

}

module.exports = builder