const _ = require('../@bender')

const command_name = 'raw'

const raw = (cli) =>
  cli
    .command(`${command_name}`)
    .arguments('[type] [name] [destFolder]')
    // .arguments('<type> <name>')
    .alias('r')
    .description('Create fast snippets for your needs')

      .option('-f, --flow',   'list flows, aliasses, options, files etc.')
      .option('-Fo, --force', 'Force to OVERRIDE the file with RAW file ')
      .option('-F, --fresh',  'Use live config instead of cached ones')
      // .option('-w, --with <type>', '')

  .action(async (type, name, destFolder, options) => {

    let fresh, freshType = 'cached'
    if (options.fresh) freshType = 'fresh'

    if (options.flow) _.x.cmd.execFlow(command_name, type, options)
    else {

      fresh = _.fresh(freshType, command_name).def

      if (type in fresh) {

        if (name) {

          let _raw = fresh[type]
          let fileTarget = name + '.' + _raw.src.split('.').pop()
          let destTarget = _raw.dest + fileTarget
          let checkExists = _.fs.exists(destTarget)
      
          if (!checkExists || options.force) {
    
            let logName = `${command_name}:${type}::${fileTarget}`
  
            _.stream({
              src: _raw.src,
              rename: (path) => {
                if (path.extname != '')
                  if (!path.basename.includes('raw')) path.basename = name 
                  else path.basename = path.basename.replace('raw', name)
              },
              replace: { find: _raw.replace, change: name },
              dest: () => {
                if (destFolder) return _raw.dest + '/' + destFolder + '/' + name
                else return _raw.dest
              }
            }, logName)
    
          } else return checkExists

        } else _.log.error('Enter a name for your file.', type)

      } else _.log.error('This raw file or folder doesn\'t exist.', type)
  
    }

  })

module.exports = raw