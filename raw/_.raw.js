const _ = require('../cli/_.root')

const flower = {
  name: 'raw',
  flow: {
    type: 'each',
    tree: true,
    root: { src: _.raw },
  }
}

const raw =  {
  origin: true,
  name: flower.name,
  flow: flower.flow,
  cwd: flower.flow.root,
  // subcmd: {},
  command: {
    src: `/cli/command.js`,
    replace: '__command_name_',
    dest: `${_.cli.commands}`,
  },
  // config: {
  //   src: `/cli/config.js`,
  //   dest: `${_.cli.cache.folder}`,
  // },
  // bender: {},
  // def: {}
}

module.exports = raw
