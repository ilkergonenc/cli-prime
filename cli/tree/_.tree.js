const log = require('../util/@log').tree
const branches = require('./.branches')

const defaults = {
  head: {
    tail: true,
    info: false,
    line: false,
  },
  foot: {
    tail: true,
    info: false,
    line: false,
  },
}

const tree = (object, options) => {

  let treeOrigin = 'unknown',
      treeType = 'Tree',
      treeName = '',
      treeLength = { depth:0, branch: 0, leaf: 0 }

  Object.keys(object).forEach(key=>{
    if (['origin', 'fresh', 'cached'].includes(key)) treeOrigin = key
  })

  if (object.tree && object.tree != 'tree' && !options.forceTree) treeType = 'Flow'
  if (object.flow) treeType = 'Flow'

  if (object.tree) treeName = object.tree
  if (object.name) treeName = object.name

  // Tree - START
  if (defaults.head) log.header(treeType, treeName, treeOrigin, defaults)

  // Branch - START
  if (options.forceTree)
    if (!options.flatten)   branches.tree(object, treeName, options, treeLength, 0)
    else                    branches.tree(object, treeName, options, treeLength, 'flat')
  else                      branches.flow(object, treeName, options, treeLength, 0)
  // Branch - END

  if (defaults.foot) log.footer(treeLength, treeType, options, defaults)
  // Tree - END
  
}

module.exports = tree