const bender = {

  watch:  require('./flow/do/watcher'),
  stream: require('./flow/one'),
  def:    require('./flow/def'),
  
  fresh:  require('./tree/in/.fresh'),
  tree:   require('./tree/_.tree'),
  
  fs:     require('./flow/do/@fs'),

  log:    require('./util/@log'),

  util:   require('./util/_.util'),
  x:      require('./util/_.util'),
  
}

module.exports = bender