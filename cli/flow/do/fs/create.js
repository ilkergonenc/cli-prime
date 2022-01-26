const path = require('path')
const fs = require('fs')
const vinylfs = require('vinyl-fs')

const create = {
  write: (buff, filepath) => {
    let dirname = path.dirname(filepath), buffer = new Buffer.from(buff)
    if (!fs.existsSync(filepath)) fs.mkdirSync(dirname, {recursive:true})
    fs.open(filepath, 'w', function(err, fd) {
      if (err) throw 'could not open file: ' + err
      fs.write(fd, buffer, 0, buffer.length, null, function(err) {
        if (err) throw 'error writing file: ' + err
        fs.close(fd, function() {
            console.log(`File created succesfully. '${filepath}'`)
        })
      })
    })
  },
  dest: (_dest) => { 
    return vinylfs.dest(_dest)
  },
}

module.exports = create