const command_name = 'util'

const util = (cli) => {
  // in
  const util = 
    new cli
        .Command('util')
        .alias('x')
        .description(`${command_name}ity commands for more options`)

          // .option('-li, --list [opts]', 'list flows, aliasses, options, files etc.')
  
  // list - command
  // const list = require('./util/list'); list(util)
  util.command('back-up')
  util.command('check-update')
  util.command('vs')

  // process & help
  util.on('command:*', function (operands) {
    console.error(`error: unknown command '${operands[0]}'`)
    util.help()
  })

  return util
}

module.exports = util