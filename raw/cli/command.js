const _ = require('../@bender')
// const log = require('../util/@log')

// const aliasses = {}

const command_name = '__command_name_'
const __command_name_ = (cli) =>
  cli
    .command(`${command_name}`)
    .arguments('<forced> [optinal]')
    .alias('')
    .description('')

      .option('-h, --help', `display help for ${command_name} command`)

  .action((forced, optinal, options) => {
    // exec = async (forced, optinal, options) => {
      // const sequences = await _.bfs.construct(_.__command_name_, command_name)
  
      if (!forced || !options) _.x.execmd('bend __command_name_ -h')
  
    })

module.exports = __command_name_