'use strict'
// const root =      'C:/users/ilkergonenc/V5/',
const root =      './',
      deploy =    `${root}@deploy`,
      play =      `${root}@play`,
      sync =      `${root}@pro`,
      uiKit =     `${root}@uiKit`,
      cli =       `${root}cli`,
      raw =       `${root}raw`,
      resource =  `${root}resource`

module.exports = {
  root:           `${root}`,

  deploy:         `${deploy}`,
  play:           `${play}`,
  sync:           `${sync}`,
  uiKit:          `${uiKit}`,

  cmd:          `${root}bend.cmd`,
  cli: {
    _:            `${cli}`,
    // commander:    `${cli}/bend.js`,
    commands:     `${cli}/cmd/`,

    // bender:       `${cli}/@bender.js`,
    // flow:         `${cli}/flow/`,
    // tree:         `${cli}/tree/`,
    // utils:        `${cli}/util/`,

    cache: {
      folder:     `${cli}/_.cache/`,
      file:       `${cli}/_.cache/bend.js`,
      src:        `${cli}/_.cache/bend`
    },

    // gulp:         `${cli}/gulpfile.js`,

  },
  
  raw:            `${raw}`,

  resource:       `${resource}`,
  re : {
    depends:      `${resource}/libraries`,
    assets:       `${resource}/assets`,
  },
  
}