const log = require('../util/@log')

const sequencer = {
  series: async (seq, name) => {

    let asyncForEach = async (array, callback) => {
      for (let i = 0; i < array.length; i++) {
        await callback(array[i], i, array);
      }
    }
  
    let logName = `${name} <series>`
    let startTime = log.flow.start(logName)

    // if (Array.isArray(seq))
    //   await asyncForEach(seq, async (_def) => { if (_def.flow) await def(_def) })

    if (Object.keys(seq).length) 
      await asyncForEach(Object.entries(seq), async ([key, _def]) => { if (_def.flow) await def(_def) })
    
    log.flow.end(logName, startTime)
  
  },
  parallel: async (seq, name) => {
  
    let logName = `${name} <parallel>`
    let startTime = log.flow.start(logName)

    let promises = []

    // if (Array.isArray(seq)) 
    //   seq.forEach(async (_def) => { if (_def.flow) promises.push(def(_def)) })
    
    if (Object.keys(seq).length) 
      Object.entries(seq).forEach(([key, _def]) => { if (_def.flow)  promises.push(def(_def)) })

    let results =  await Promise.all(promises) 
    let count = 0
    for (const res of results) {
      count += (await res)
    }
  
    log.flow.end(logName, startTime)
  
  }

}

const def = obj => require('./def')(obj) 

module.exports = sequencer