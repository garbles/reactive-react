Bacon = require('baconjs')

AsStreamMixin =
  asStream: (fn) ->
    bus = new Bacon.Bus()
    fn(bus)

    (event) -> bus.push(event)


module.exports = AsStreamMixin
