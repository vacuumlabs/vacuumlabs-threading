const $$ = {}

const thread = (value, ...args) => {
  for (const arg of args) {
    if (Array.isArray(arg)) {
      let fn
      const finalArgs = []
      for (const one of arg) {
        if (fn == null) {
          fn = one
        } else if (one === $$) {
          finalArgs.push(value)
        } else {
          finalArgs.push(one)
        }
      }
      value = fn(...finalArgs)
    } else if (typeof arg === 'string') {
      if (arg[0] === '.') {
        value = value[arg.slice(1)]
      } else {
        throw new Error('threading error - argument is a String, but does not start with dot')
      }
    } else {
      value = arg(value)
    }
  }
  return value
}

module.exports = {thread, $$}
