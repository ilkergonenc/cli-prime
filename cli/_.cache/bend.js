module.exports = bend = {
  raw: {
    cached: true,
    tree: 'raw',
    def: {
      name: 'raw',
      flow: {
        type: 'group::each',
        tree: true,
        parallel: true,
        depth: 'raw',
        branch: true,
      },
      command: {
        name: 'command',
        flow: {
          type: 'one',
          stream: true,
          leaf: true,
          depth: 'raw.command',
        },
        src: './raw/cli/command.js',
        replace: '__command_name_',
        dest: './cli/cmd/',
      },
      hug: {
        name: 'hug',
        flow: {
          type: 'one',
          stream: true,
          leaf: true,
          depth: 'raw.hug',
        },
        src: './raw/hug/raw.hug.pug',
        replace: 'raw',
        dest: './@uiKit/ui',
      },
    },
  },
}