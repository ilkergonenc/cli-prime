const jsObject = { 
  to: {
    string: (obj, key) => {  
      const objArray = [], sep = '\n '      
      let objLoop = (obj) => {
        for (const [name, value] of Object.entries(obj)) {
          if (typeof value === 'object' && !Array.isArray(value)) {
            objArray.push(`${name}: { `)
              objLoop(value, name)
            objArray.push(`}, `)
          } else if (typeof value === 'function') {
            objArray.push(`${name}: ${ value.toString().trim() }, `)
          } else {
            objArray.push(`${name}: ${ require('util').inspect(value, {showHidden: false, compact: false, depth: null}) }, `)
          }
        }
      }
      objLoop(obj)
      return require('js-beautify').js(`module.exports = ${key} = {${sep}${objArray.join(`${sep}`)}\n}`, { indent_size: 2, space_in_empty_paren: true })
    },
    json: (obj, key) => {
      let object = {}
      if (key) object[key] = obj 
      else object = obj
      return JSON.stringify(object)
    },
    yml: (obj, key) => {
      const YAML = require('yaml')
      let object = {}
      if (key) object[key] = obj 
      else object = obj
      return YAML.stringify(object)
    }
  },
  get: require('get-value'),
  set: require('set-value'),
  del: (obj, keys) => obj !== Object(obj)
        ? obj
        : Array.isArray(obj)
        ? obj.map((item) => removeKeys(item, keys))
        : Object.keys(obj)
            .filter((k) => !keys.includes(k))
            .reduce(
              (acc, x) => Object.assign(acc, { [x]: removeKeys(obj[x], keys) }),
              {}
            ),
  key: (objKey) => {
    let obj, key
    if (objKey.includes('.')) {
      obj = objKey.split('.').shift()
      key = objKey.replace(obj+'.', '')
    } else {
      obj = objKey
    }
    return {
      obj: obj, 
      key: key 
    }
  },
  yamlParser: filepath => {
    const file = require('fs').readFileSync(filepath, 'utf8')
    return require('yaml').parse(file)
  }
}
module.exports = jsObject