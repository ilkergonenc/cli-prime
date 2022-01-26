// const _ = require('../../.config/_.config')
const log = require('../../../util/@log')

const fs = require('fs')
const del = require('delete')

const command_name = 'delete'

const delKeys = {
  // bs: {
  //   main: `${_.root.uiKit}/bootstrap/@main`,
  //   dist: `${_.root.uiKit}/bootstrap/@`,
  // },
  // play: `${_.root.play}/source`,
}

module.exports = (target, options) => {

  let logName = `${command_name}:${target}`,
      startTime = ''
      _del = ''

  if (options.path) {
    _del = target
  } else {
    _del = delKeys
    if (target.includes('.')) {
      target.split('.').forEach(piece => { _del = _del[piece]})
    } else {
      _del = _del[target]
    }
  }

  try {
    if (fs.existsSync(_del)) { 
      startTime = log.start(logName)
      del.promise(_del).then(function(deleted) {
        log.end(logName, startTime)
      })
    } else {
      log.error('This file doesn\'t exists.', _del)
    }
  } catch(err) {
    console.error(err)
  }

}