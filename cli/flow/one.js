const log = require('../util/@log')
const build = require('./do/builder')

let streamer = async (stream, name) => {

    let logName = `${name}`
  
    return new Promise(resolve => {
    
      let event
      let startTime = log.flow.start(logName)

      if (!stream['rollup']) {

        event = build(stream, 'start')
        event = build(stream, event)
        return event.on('end', () => { 
          resolve(log.flow.end(logName, startTime)) 
        })
        
      } 

      if (stream['rollup']) {

        resolve(
          Promise.resolve( 
            build(stream, 'rollup') 
          ).then(log.flow.end(logName, startTime))
        )

      }

    })

}

module.exports = streamer