const read = require('./fs/read')
const modify = require('./fs/modify')
const create = require('./fs/create')

const fileSystem = {

  // file system
  exists:     require('./fs/exists'),

  del:        require('./fs/del'),

  src:        read.src,
  read:       read.read,
  
  concat:     modify.concat,
  rename:     modify.rename,
  replace:    modify.replace,

  write:      create.write,
  dest:       create.dest,

}

module.exports = fileSystem