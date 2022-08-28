const curry = function curry(this: Function, ...args: any[]): any {
  if (args.length < this.length) {
    return curry.bind(this, ...args)
  }
  return this(...args)
}

const compose = function compose(this: Function, ...args: any[]): any {
  return [this, ...args].reduce((prev, current) => {
    return (...args: any[]) => prev(current(...args))
  })
}

const pipe = function pipe(this: Function, ...args: any[]): any {
  return [this, ...args].reduceRight((prev, current) => {
    return (...args: any[]) => prev(current(...args))
  })
}

const install = (): void => {
  Object.assign(Function.prototype, {
    curry,
    compose,
    pipe
  })
}

export { curry, compose, pipe, install }
