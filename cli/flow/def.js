const one = require('./one')
const { parallel, series } = require('./seq')

const def = (object) => {

  let flow, flower, def 
  flow = object
  if (object.tree) flow = object[object.tree]
  flower = flow.flow

  if (flower.stream)    def = one(flow, flow.name)
  if (flower.parallel)  def = parallel(flow, flow.name)
  if (flower.series)    def = series(flow, flow.name)

  return def

}

module.exports = def