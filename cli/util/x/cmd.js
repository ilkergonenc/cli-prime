const cmd = {

  addHelp: (help, bl, val) =>{
    
    const flatten = require('./_flat')

    let helpArray = []
    helpArray.push('\n'+help.title)

    if (bl) {
      helpArray.push( ' - ' + flatten(help.obj, 'break:space:line:space', val) )
      helpArray = helpArray.join('\n')
    }
    else {
      helpArray.push( flatten(help.obj, 'comma:space', val) )
      helpArray = helpArray.join(' ')
    }

    return helpArray
  },

  execFlow:(obj, key, opts) => {
    let objectKey
    ;(key) ? objectKey = `${obj}.${key}` : objectKey = obj
    if (opts.fresh) objectKey = objectKey + ' -F'
    cmd.exec(`bend flow ${objectKey}`)
  },

  exec: (command) => {
    const { spawn } = require('child_process')
    
    spawn(command, [], { stdio: 'inherit', shell: true })
    .on('stdout', (data) => {
      console.log(`stdout: ${data}`)
    })
    .on('stderr', (data) => {
      console.error(`stderr: ${data}`)
    })
    // .on('exit', (code) => {
    //   console.log(`child process exited with code ${code}`)
    // })
  }

}

module.exports = cmd