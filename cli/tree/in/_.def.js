const x = require('../../util/_.util')

const definer = (def, obj) => {

  if (def.flow) {
    Object.keys(def).forEach(key=>{
      if (typeof def[key] === 'string' || def[key] instanceof String) {
        if (key!='name') def[key] = x.jsObj.get(obj[obj.tree], def[key])
      } 
      else {
        if (key!='flow') definer(def[key], obj)
      }
    })
  }

}

const def = (object) => {

  if (object.def==object.tree) {
    object.def = object[object.tree]
    delete object[object.tree]
  }
  else {
    definer(object.def, object)
  }

}

module.exports = def