#!/usr/bin/env node
'use strict'
// in
// const { exec } = require('./util/x/cmd')
const cli = require('commander')
cli
  .version(require('../package.json').version)
  .description(require('../package.json').description)
  .usage('| pr  [command]  ?[keys|subCommand]  [options]')
  .addHelpText('before', ` ____  ____  ____  ____  ____\n||p ||||r ||||i ||||m ||||e ||\n||__||||__||||__||||__||||__||\n|/__\\||/__\\||/__\\||/__\\||/__\\|\n`)

// global options    
// .option('-li, --list [objKey]', 'list flows, aliasses, options, files etc.')

// play - command
// const play = require('./cmd/@play'); play(cli)

// uiKit - command
// const uiKit = require('./cmd/@uiKit'); uiKit(cli)

// flow - command
const flow = require('./cmd/flow'); flow(cli)

// raw - command
const raw = require('./cmd/raw'); raw(cli)

// util - subCommand
const util = (cli) => require('./cmd/util')(cli)
cli.addCommand(util(cli))

// process & help
cli.on('command:*', function (operands) {
  console.error(`error: unknown command '${operands[0]}'`)
  cli.help()
}).parse(process.argv)

if (cli.args.length === 0) cli.help()
// if (cli.args.length === 1 && ['raw', 'r', 'play', 'p'].includes(cli.args[0])) 
//   exec(`bend ${cli.args[0]} -h`)
// if (cli.args.length === 2 && ['li'].includes(cli.args[1])) 
//   exec(`bend ${cli.args[0]} ${cli.args[1]} -h`)