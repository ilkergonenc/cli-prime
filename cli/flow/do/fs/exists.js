const log = require('../../../util/@log')
const fs = require('fs')

const exists = (target, dont) => {
  try {
    if (fs.existsSync(target)) { 
      if (!dont) {
        log.error('This file already exists.', target)
        return true
      }
      else {
        return false
      }
    } else {
      if (dont) {
        log.error('This file doesn\'t exists.', target)
        return true
      }
      else {
        return false
      }
    }
  } catch(err) {
    console.error(err)
  }
}

module.exports = exists