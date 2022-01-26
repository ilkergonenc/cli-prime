'use strict'
// const root =      'C:/users/ilkergonenc/V5/',
const root =      './',
      cli =       `${root}cli`,
      raw =       `${root}raw`

module.exports = {
  root:           `${root}`,

  cmd:          `${root}bend.cmd`,
  cli: {
    _:            `${cli}`,
    // commander:    `${cli}/bend.js`,
    commands:     `${cli}/cmd/`,

    cache: {
      folder:     `${cli}/_.cache/`,
      file:       `${cli}/_.cache/bend.js`,
      src:        `${cli}/_.cache/bend`
    },

  },
  
  raw:            `${raw}`,

}