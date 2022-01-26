const typeOf = (thing) => {
  if (Array.isArray(thing)) return 'array'
  else                      return typeof thing
}
const _depth = (depth, plus, log) => {

  let chain, level

  if (!plus)          chain = depth
  else if (depth==0)  chain = plus
  else                chain = depth + '.' + plus

  ;(depth==0) ? level = 0 : level = [] = chain.split('.')

  return { 
    chain: chain,
    level: (level==0) ? 0 : --level.length, 
  }

}
const _index = (i, total) => {
  let index = { val: ((i)=>{ return (i<10) ? '0'+i.toString() : i })(i) }
  if (i == total) index.last = true
  return index
}
const _space = (depth, last, branch, depthLine) => {

  let spacers = { default: '├───', last: '└───', depth: '│  ' },
      spacer = [] 
  
  if (branch) spacers.default = '├──┬'

  if (depth>0) 
    for (let i = 0; i < depth; i++) { spacer.push(spacers.depth) } 

  if (last && depth!=0) spacer.push(spacers.last) 
  else 
    if (!depthLine) spacer.push(spacers.default)
    else spacer.push('├─')
  return spacer.join('')

}
const _details = (obj, opts) => {
  const chalk = require('chalk')

  const c = {
    y:    (c) => { return chalk.yellow(c) },
    yb:   (c) => { return chalk.yellowBright(c) },
    c:    (c) => { return chalk.cyan(c) },
    cb:   (c) => { return chalk.cyanBright(c) },
    m:    (c) => { return chalk.magenta(c) },
    mb:   (c) => { return chalk.magentaBright(c) },
    gr:   (c) => { return chalk.green(c) },
    grb:  (c) => { return chalk.greenBright(c) },
    g:    (c) => { return chalk.gray(c) },
    gdim: (c) => { return chalk.gray.dim(c) },
    w:    (c) => { return chalk.white(c) },
  }

  let o = {}

  o.space =   `${c.g(obj.space)}∘ `  
  o.type =    `${c.gr(obj.type)}`
  o.index =   `${c.g(obj.index)}`   
  o.typeOf =  `(${c.mb(obj.typeOf)})` 
  o.key =     `${c.w(obj.key)}:`    
  ;(obj.value) ? o.val = `'${c.yb(obj.value)}'` : o.val = ''

  if (obj.depth) {
    // o.space = ''
    o.index = `${c.g('0'+obj.depth.level)}`
    o.key =   `key:`
    // o.key =   ''
    o.val =   `'${c.y(obj.depth.chain)}'`
  }

  if (obj.typeOf == 'array')    o.val = ` ${c.yb('[ array Array ]')}`
  if (obj.typeOf == 'function') o.val = ` ${c.yb('[ function Function ]')}`
  if (obj.typeOf == 'object') {
    if (opts.flatten) o.val = ` ${c.yb('[ object Object ]')}`
    if (opts.hideDepth || opts.moreDetails) o.val = ``
    else o.val = obj.value
  }  
  // if (obj.typeOf == 'depth')    o.val = ` '${c.yb(obj.value)}'`

  if (opts.styled) {
    o.space =   `${c.g(obj.space)}`
    o.type =    `(${c.grb(obj.type)})`
    o.index =   `[${c.g(obj.index)}]`   
    o.typeOf =  `(${c.mb(obj.typeOf)})` 
    o.key =     `{${c.w(obj.key)}:`    
    o.val =     ` '${c.yb(obj.value)}'}`

    if (obj.depth) {
      // o.val = ''
      o.type =    `[${c.gr(obj.type)}]`
      o.index =   `(${c.g('0'+obj.depth.level)})`   
      o.typeOf =  `[${c.m(obj.typeOf)}]` 
      o.key =   `key:`
      // o.key =   ''
      o.val =   `'${c.y(obj.depth.chain)}'`
    }

    if (obj.typeOf == 'object') {
      if (opts.flatten) o.val = ` ${c.yb('[ object Object ]')}}`
      if (opts.hideDepth) o.val = ``
      else o.val = `${obj.value}}`
    }  

  }

  if (!opts.moreDetails) {
    o.type =    ``
    o.index =   ``   
    o.typeOf =  `` 
  }

  return o
}
module.exports = depth = {
  typeOf: typeOf,
  _depth: _depth,
  _index: _index,
  _space: _space,
  _details: _details,
}