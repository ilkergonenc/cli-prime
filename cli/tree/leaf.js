const log = require('../util/@log').tree
const { _space, _details } = require('./.depth')

const leaf = {
  get: (item, depth, index, opts) => {
    item.space = _space(depth.level, index.last)
    item.type = 'L'
    log.depth(item, opts, _details(item, opts))
  },
}

module.exports = leaf