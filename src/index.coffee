assign = require('./util/assign.coffee')
asStream = require('./mixins/asStream.coffee')
streamState = require('./mixins/streamState.coffee')
targetValue = require('./mixins/targetValue.coffee')

Mixin = assign({},
  asStream,
  streamState,
  targetValue
)

module.exports = assign({},
  Mixin: Mixin
)
