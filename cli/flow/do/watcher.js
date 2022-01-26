const watch = require('glob-watcher')
const pathJoin = require('path').join
const builder = require('../def')
const log = require('../../util/@log')

const watcher = (globs, opts, flower) => {

  log.flow.watcher(flower.name)

  watch(globs, opts).on('change', function(path, stat) {
    // console.log(path)
    // console.log(stat)
    // flower.src = pathJoin(flower.watch.opts.cwd, path)
    delete flower.watch
    // console.log(flower)
    builder(flower)
  })
  
}

module.exports = watcher