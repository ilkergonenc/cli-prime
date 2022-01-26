const _ = require('../@bender')

const objKeys = {
  title: 'Object Keys:',
  obj: [ 
    // 'deploy', 
    'play',  
    // 'sync',  
    'ui',  
    'raw',  
    // 'resource',  
    // 'root', 
  ],
}

const command_name = 'flow'
const list = (cli) =>
  cli
    .command(`${command_name}`)
    .arguments('[objectKey]')
    .alias('f')
    .description('List flows, aliasses, options, files etc. By defult it uses cached files.')
    .addHelpText('after', _.x.cmd.addHelp(objKeys, false))

      .option('-F, --fresh',          'use fresh setting files')
      .option('-O, --origin',         'see original setting file')
      .option('-C, --cache',          'cache setting files')
      .option('-T, --force-tree',     'force tree view on flow object')

      .option('-hd, --hide-depth',    'hide depth, plain view')
      .option('-md, --more-details',  'show more detailes; typeOf, index')

      .option('-fl, --flatten',       'flatten object')
      .option('-S, --styled',         'flatten object')


  .action((objectKey, options) => {

    let obj = '', key = ''
    if (objectKey) {
      let objKey =  _.x.jsObj.key(objectKey)
      obj =   objKey.obj
      key =   objKey.key 
    } 

    let type = 'cached'
    if (options) {
      if (options.origin) type = 'origin'
      if (options.fresh)  type = 'fresh'
      if (options.cache)  _.fresh('cache')
    } 
    if (options && !options.cache)
      _.tree(_.fresh(type, obj, key), options)

  })

module.exports = list
