_undefined = ->
  (state) => return @setState(state)

_function = (fn) ->
  (args...) =>
    state = fn.apply(@, args)
    @setState(state)

_string = (str) ->
  (value) =>
    state = {}
    state[str] = value

    @setState(state)

_streamState =
  "undefined": _undefined,
  "function": _function,
  "string": _string

StreamStateMixin =
  streamState: (prop) ->
    type = (typeof prop)

    if (type == 'undefined' || type == 'function' || type == 'string')
      _streamState[type].call(@, prop)
    else
      throw 'streamState does not know how to handle a ' + type + '.'

module.exports = StreamStateMixin;
