const log = require('../util/@log').tree
const { typeOf, _depth, _index, _space, _details } = require('./.depth')
const leaf = require('./leaf')

const branches = {
  tree: (obj, name, opts, total, depth) => {
    // DEPTH
    let depthLog = {}
    if (depth!='flat') {
      depth = _depth(depth, name)
      if (depth.level>total.depth) total.depth = depth.level
      // LOG - ITEM
      depthLog = {
        space: _space(depth.level, false, false, true), 
        type: 'D', 
        typeOf: 'depth', 
        depth: depth
      }
      if (opts.moreDetails) log.depth(depthLog, opts, _details(depthLog, opts))
    }
    // LOOP -START
    let loop = Object.keys(obj),
        iTotal = loop.length
    loop.forEach((key, i) => {
      // INDEX - LAST
      // if (!['name', 'flow', 'tree', 'branch', 'leaf'].includes(key)) {

        ++i; let index = _index(i, iTotal) 
        let item = {
          space: _space(depth.level), 
          index: index.val,
          typeOf: typeOf(obj[key]), 
          key: key,
          value: obj[key],
        }
        if (typeOf(obj[key]) === 'object' && depth!='flat') { 
          ++total.branch 
          item.space = _space(depth.level, index.last, true)
          item.type = 'B'
          if (!opts.hideDepth && !opts.moreDetails) {
            depthLog.depth = _depth(depth.chain, key)
            depthLog.typeOf = 'depth', 
            depthLog.type = 'D', 
            depthLog = _details(depthLog, opts)
            item.value = {} = `${depthLog.type}${depthLog.index}${depthLog.typeOf}${depthLog.key}${depthLog.val}`
          }
          log.depth(item, opts, _details(item, opts))
          branches.tree(obj[key], key, opts, total, depth.chain) 
        } 
        else { 
          ++total.leaf 
          leaf.get(item, depth, index, opts)
        }
      // }
    })
    // LOOP -END
  },
  flow: (obj, name, opts, total, depth) => {
    // if (depth == 0)
    //   log.flow({
    //     space: _space(depth.level, false, true),
    //     name: obj.name, 
    //     flow: obj.flow 
    //   })
    // if (depth == 0) ++depth
    // DEPTH
    depth = _depth(depth, name)
    if (depth.level>total.depth) total.depth = depth.level
    // LOOP -START
    let loop = Object.keys(obj),
        iTotal = loop.length
    loop.forEach((key, i) => {
      // INDEX - LAST
      if (!['name', 'flow', 'tree', 'fresh', 'cached'].includes(key)) {
        let flower = { def: true, type: 'one', stream: true, leaf: true }
        if (obj[key].flow) flower = obj[key].flow
        ++i; let index = _index(i, iTotal) 
        if (flower.branch) { 
          ++total.branch 
          log.flow({
            space: _space(depth.level, index.last, true),
            name: obj[key].name, 
            flow: obj[key].flow 
          })
          branches.flow(obj[key], key, opts, total, depth.chain) 
        } 
        if (flower.leaf) {
          ++total.leaf  
          if (!flower.def)   
            log.flow({
              space: _space(depth.level, index.last),
              name: obj[key].name, 
              flow: obj[key].flow 
            })
          else
            log.flow({
              space: _space(depth.level, index.last),
              name: key
            })
        }
      }
    }) // LOOP -END
  },
}

module.exports = branches