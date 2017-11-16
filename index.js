const $$ = {}

const thread = (value, ...args) => {
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (Array.isArray(arg)) {
      if (arg.length === 0) {
        throw new Error(`Threading macro was given an array intruction of length 0 (position ${i})`)
      }
      const fn = arg[0]
      if (typeof fn !== 'function') {
        throw new Error(`Threading macro was given an array instruction, which first element is not a function (position ${i}). Got ${typeof fn} instead`)
      }
      const finalArgs = []
      let found$$ = false
      for (const one of arg.slice(1, arg.length)) {
        if (one === $$) {
          found$$ = true
          finalArgs.push(value)
        } else {
          finalArgs.push(one)
        }
      }
      if (!found$$) {
        throw new Error(`Threading macro was given an array instruction which does not contain placeholder for an previously computed value ($$). (position: ${i})`)
      }
      value = fn(...finalArgs)
    } else if (typeof arg === 'string') {
      if (arg[0] === '.') {
        value = value[arg.slice(1)]
      } else {
        throw new Error(`Threading macro was given an instruction which is a String, but does not start with dot (position ${i})`)
      }
    } else if (typeof arg === 'function') {
      value = arg(value)
    } else {
      throw new Error(`Threading macro was provided invalid instruction. Instruction should be either Array, String or function. Given was ${typeof arg} (position: ${i})`)
    }
  }
  return value
}

module.exports = {thread, $$}
