const x = require('../../util/_.util')
const def = require('./_.def')

const flow = {
  tree: (originFlow, reFlow) => {
    if (originFlow.origin && originFlow.flow && originFlow.flow.tree && originFlow.flow.root) {

      delete originFlow.origin
      reFlow.fresh = true
      reFlow.tree = originFlow.name
      delete originFlow.name
      delete originFlow.flow.root

      let flowDef
      if (!originFlow.def || Object.keys(originFlow.def).length==0) flowDef = reFlow.tree
      else flowDef = Object.assign({name:reFlow.tree+':def'}, flow.defFlow(originFlow.def, reFlow.tree))
      delete originFlow.def
  
      flow.branches(originFlow, null, reFlow.tree, 0, reFlow)
  
      if (flowDef) x.jsObj.set(reFlow, 'def', flowDef)

      // console.log(originFlow)
      // console.log('---------------')
      // console.log(reFlow)

    }
  },
  treeFlower: (thing) => {
    const typeO = ['obj', 'files'],
          tree =  ['obj', 'tree'],
          flow =  ['one', 'seq'],
          one =   ['one', 'each', 'all'],
          seq =   ['parallel', 'series']

    let type, flowSet = {}

    if (tree.includes(thing)) { type = '(tree::object)' } 
    else if (one.includes(thing) || seq.includes(thing)) {
      let flowVal = thing
      thing = {}
      thing.flow = flowVal
    }

    if (!thing.one && !thing.seq) {
      if (seq.includes(thing.flow)) type = thing.flow
      if (one.includes(thing.flow))
        if (thing.flow=='one') type = thing.flow
        else type = 'group::'+ thing.flow
    }
    if (thing.one || thing.seq)  {
      if (flow.includes(thing.flow))
        if (seq.includes(thing[thing.flow])) type = thing.seq
        if (one.includes(thing[thing.flow]))
          if (thing[thing.flow]=='one') type = thing.one
          else type = 'group::'+ thing.one
    }
    if (!thing.flow && thing.one) type = '(tree::object)'

    flowSet.type = type

    if (type=='one')                  flowSet.stream = true
    else if (type=='series')          flowSet.series = true
    else if (type!='(tree::object)')  flowSet.parallel = true

    return flowSet

  },
  setFlow: (originFlow) => {
    let flowSettings = {}
    if (originFlow.flow) {
      if (originFlow.flow.type) 
        flowSettings = Object.assign(originFlow.flow, flow.treeFlower(originFlow.flow.type))
      else flowSettings = flow.treeFlower(originFlow.flow)
    } else {
      if (originFlow.src) flowSettings = flow.treeFlower('one')
      else                flowSettings = flow.treeFlower('parallel')
    }
    return flowSettings
  },
  defFlow: (flowDef) => {
    Object.keys(flowDef).forEach(key=>{
      if (typeof flowDef[key] === 'string') {
        if (key=='flow') {
          flowDef.flow = flow.setFlow(flowDef)
          flowDef.flow.branch = true
        }
      } 
      else {
        if (key!='flow') {
          flowDef[key].name = key
          flow.defFlow(flowDef[key])
        }
      }
    })
    return flowDef
  },
  cwd: {
    filters: ['src', 'dest', 'del', 'cwd', 'watch'],
    one: (cwd, obj) => {
      if (cwd!==null) {
        flow.cwd.filters.forEach(filter => { 
          if (obj[filter] && obj.force && obj.force[filter]) {
          } else if (obj[filter]) {
            switch (filter) {
              case 'src':
              case 'watch':
                if (obj[filter].globs || obj[filter].opts) {}
                else if (Array.isArray(obj[filter]) || cwd.cwd) {
                  let newSrc = {
                    globs: obj[filter],
                    opt: { cwd: cwd[filter] }
                  }
                  obj[filter] = {} = newSrc
                } else {
                  let newFilter = ((cwd[filter]) ? cwd[filter] : '' ) + obj[filter]
                  if (newFilter!='') obj[filter] = {} = newFilter
                }
                break;
              default:
                if (obj[filter]===true) obj[filter] = ''
                let newFilter = ((cwd[filter]) ? cwd[filter] : '' ) + obj[filter]
                if (newFilter!='') obj[filter] = {} = newFilter
                break;
            }
          }
          delete obj.force
          return obj
        })
      }
    },
    seq: (cwd, obj) => {
  
      if (cwd!==null && obj.cwd) {
        let newCwd = {}
        flow.cwd.filters.forEach(filter => { 
          let newFilter = ((cwd[filter]) ? cwd[filter] : '' ) + ((obj.cwd[filter]) ? obj.cwd[filter] : '' )
          if (newFilter!='') newCwd[filter] = {} = newFilter
        })
        cwd = {} = newCwd
      } else {
        if (obj.cwd) cwd = {} = obj.cwd
      }
      return cwd
    }
  },
  branches: (originFlow, cwd, name, depth, reFlow) => {

    if (originFlow.origin && originFlow.flow && originFlow.flow.tree && originFlow.flow.root)  {
      let newTree = {}
      flow.tree(originFlow, newTree)
      // console.log(reFlow)
      // console.log(depth)
      // console.log(newTree[newTree.tree])
      x.jsObj.set(reFlow, depth+'.'+name, newTree[newTree.tree])
    } 
    else {

      ;(depth==0) ? depth = name : depth = depth+'.'+name

      if (depth!=0) {
        let newFlow = { name: name, flow: {} }
        x.jsObj.set(newFlow, 'flow', flow.setFlow(originFlow))
        newFlow.flow.depth = depth
        x.jsObj.set(reFlow, depth, {})
        Object.assign(x.jsObj.get(reFlow, depth), newFlow)
        if (originFlow.flow) delete originFlow.flow
      }

      if (originFlow.cwd && originFlow.cwd.watch) x.jsObj.set(reFlow, depth+'.flow.watch', true)

      cwd = flow.cwd.seq(cwd, originFlow)
      if (originFlow.cwd) delete originFlow.cwd

      if (originFlow.src || originFlow.del) {
        flow.leaf(originFlow, cwd, name, depth, reFlow)
      }
      else if (!originFlow.src && !originFlow.del) {
        Object.keys(originFlow).forEach(key=>{
          if (!['name', 'flow', 'cwd'].includes(key)) {
            flow.branches(originFlow[key], cwd, key, depth, reFlow)
            x.jsObj.set(reFlow, depth+'.flow.branch', true)
          }
        })
      }  

    }
    
  },
  leaf: (originFlow, cwd, name, depth, reFlow) => {
    let newFlow = { name: name, flow: {} }
    x.jsObj.set(newFlow, 'flow', flow.setFlow(originFlow))
    x.jsObj.set(newFlow, 'flow.leaf', true)
    newFlow.flow.depth = depth
    Object.assign(newFlow, originFlow)

    flow.cwd.one(cwd, newFlow)

    if (newFlow.append) newFlow = flow.oneToSeq(newFlow, 'append')
    // if (newFlow.prepend) newFlow = flow.oneToSeq(newFlow, 'prepend')

    x.jsObj.set(reFlow, depth, newFlow)

  },
  oneToSeq: (reFlow, preApppend) => {
    if (reFlow[preApppend].minify) {
      let newFlow = {
        name: reFlow.name,
        flow: flow.treeFlower(reFlow[preApppend].flow),
        watch: reFlow.watch,
        compile: reFlow,
        minify: {
          name: reFlow.name+':minify',
          flow: flow.treeFlower('one'),
          src: reFlow.dest+'/'+reFlow[preApppend].src,
          sourcemaps: reFlow.sourcemaps,
          minify: reFlow[preApppend].minify,
          rename: {suffix: '.min'},
          dest: reFlow.dest,
        }
      }
      delete newFlow.compile[preApppend]
      delete newFlow.compile.watch
      newFlow.compile.name = newFlow.compile.name+':compile'
      newFlow.compile.flow = flow.setFlow(newFlow.compile)
      newFlow.flow.depth =  newFlow.compile.flow.depth
      delete newFlow.compile.flow.depth
      newFlow.flow.branch = true
      newFlow.minify.flow.leaf = true
      return newFlow
    }
  },
}

const flower = (originFlow) => {
  let reFlow = {}
  flow.tree(originFlow, reFlow)
  def(reFlow)
  return reFlow
}

module.exports = flower