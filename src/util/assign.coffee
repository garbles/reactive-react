assign = (target, sources...) ->
  for source in sources
    target[key] = source[key] for key in Object.keys(source)

  target

module.exports = assign
