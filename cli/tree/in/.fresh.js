const root = require('../../_.root')
const { jsObj } = require('../../util/_.util')
const { write } = require('../../flow/do/@fs')
const flower = require('./flower')
      
const fresh = (type, cmd, key) => {

  const bend = {
    cached:   require('../../_.cache/bend'),
    // play:     require('../../../@play/_.play'),
    // uiKit:    require('../../../@uiKit/_.@uiKit'),
    raw:      require('../../../raw/_.raw'),
    // re:       require('../../../resource/_.resource'),
    // root:     require('../../_.root'),
  }

  let flow = {}, fresh = bend
  if (type == 'cached') fresh = bend.cached

  if (cmd) {
    let sequences
    if (type != 'cached' && type != 'origin') sequences = flower(fresh[cmd])
    if (type == 'cached' || type == 'origin') sequences = fresh[cmd]
    flow = { obj: sequences, name: cmd }
    // if (key) {
    //   const sequence = jsObj.get(sequences, `${cmd}.${key}`)
    //   flow = { obj: sequence, name: key }
    // }
  }

  if (!cmd || type == 'cache')  {
    let bendObj = {}
    Object.keys(fresh).forEach(element => {
      if (element != 'cached') {
        if (element != 'root') {
          bendObj[element] = Object.assign({ cached: true }, flower(fresh[element]))    
          delete bendObj[element]['fresh']
        }
        // else bendObj[element] = fresh[element]
      }

    })
    flow = { obj: bendObj, name: 'bend' }
  }
  
  // console.log(flow.name, flow.obj)
  // console.log(jsObj.to.string(flow.obj, flow.name))

  switch (type) {
    case 'cache': 
      write(jsObj.to.string(flow.obj, flow.name), root.cli.cache.file)
      break;
    default: 
      if (!key) 
        return flow.obj
      else {
        let def, fresh = flow.obj
        if (key.includes(fresh.tree))
          fresh = jsObj.get(fresh, key)
        else
          fresh = jsObj.get(fresh.def, key)
        def = {}
        def[type] = true
        def.tree = fresh.name
        def[def.tree] = fresh
        return def
      }
      
  }
  
}

module.exports = fresh