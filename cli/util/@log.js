const chalk = require('chalk')

const c = {
  y:    (c) => { return chalk.yellow(c) },
  yb:   (c) => { return chalk.yellowBright(c) },
  c:    (c) => { return chalk.cyan(c) },
  cb:   (c) => { return chalk.cyanBright(c) },
  m:    (c) => { return chalk.magenta(c) },
  mb:   (c) => { return chalk.magentaBright(c) },
  gr:   (c) => { return chalk.green(c) },
  grb:  (c) => { return chalk.greenBright(c) },
  g:    (c) => { return chalk.gray(c) },
  gdim: (c) => { return chalk.gray.dim(c) },
  w:    (c) => { return chalk.white(c) },
}

const _ = console

const log = {

  _: (log) => { _.log(log) },

  time: {
    now: `[${c.yb(new Date().toLocaleTimeString([],{ hour12:false }))}]`,
    exec: (start, end) => {
      // process.hrtime() (`%d,%dms`, hrend[0], hrend[1] / 1000000) 
      let executionTime = ( end - start )
      if (executionTime > 999) executionTime = (executionTime / 1000) + ' s'
      else executionTime = executionTime + ' ms'
      return c.m(executionTime)
    }
  },

  tree: {
    header: (type, name, origin, def) => {

      if (origin.origin) origin  = 'original'

      let head = `${type} for '${c.yb(name)}' from ${c.mb(origin)} file`

      // _.log(`${c.g('┌───')}`)
      if (def.head.tail) _.log(`${c.g('┐')}`)
      if (def.head.info) _.log(`${c.g('│')} ${head}`)
      if (def.head.line) _.log(`${c.g('├──────────────────────────────────────────')}`)
    },
    depth: (obj, opts, o) => {

      // if (!obj.depth && o.type!='B') 
      _.log(c.g(`${o.space}${o.type}${o.index}${o.typeOf}${o.key}${o.val}`))
      // if (obj.depth && !opts.flatten) {
      //   if (optRange!=1) _.log(c.g(`${o.space}${o.type}${o.index}${o.typeOf}${o.key}${o.val}`))
      // }

    },
    flow: (obj) => {

      if (obj.flow && obj.flow.type!='one')
        _.log(`${c.g(obj.space+'∘')} ${c.cb(obj.name)} <${c.mb(obj.flow.type)}>`)
      else
        _.log(`${c.g(obj.space+'∘')} ${c.c(obj.name)}`)

    },
    footer: (count, type, opts, def) => {

      let branch = 'Branches', leaf = 'Laafs'
      if (type=='Flow') {
        branch = 'Sequences'
        leaf = 'Events'
      } 
      let depth = `${c.gr(count.depth)} Depth, `
      if (opts.hideDepth) depth = ''

      let foot = c.w(`${c.w(type+' has')} ${c.gr(count.branch)} ${branch}, ${depth}${c.gr(count.leaf)} ${leaf}`)

      if (def.foot.line) _.log(`${c.g('├──────────────────────────────────────────')}`)
      if (def.foot.info) _.log(`${c.g('│')} ${foot}`)
      if (def.foot.tail) _.log(`${c.g('└')}`)

    },
  },

  flow: {

    start: (name) => {
      _.log(`${log.time.now} Starting '${c.cb(name)}' ...`) 
      return new Date()
    },

    end: (name, start) => {
      let end = new Date()
      _.log(`${log.time.now} Finished '${c.cb(name)}' after ${log.time.exec(start, end)}`)
    },

    taskPipes: (name) => { 
      _.log(`${log.time.now} Process  '>> ${c.cb(name)}' pipe ...`)
    },

    watcher: (name) => { 
      _.log(`${log.time.now} Watching '${c.cb(name)}' flow ...`)
    },

  },

  error: (message, name) => {
    _.log(`${log.time.now} ${message} '${c.cb(name)}'`)
  },

}

module.exports = log

