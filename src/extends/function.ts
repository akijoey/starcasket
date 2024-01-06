/* eslint
  @typescript-eslint/no-this-alias: [
    "error",
    {
      "allowDestructuring": false,
      "allowedNames": ["self"]
    }
  ]
*/

export const before = function before(
  this: Function,
  callback: Function
): Function {
  const self = this
  return function (this: any) {
    callback.apply(this, arguments)
    return self.apply(this, arguments)
  }
}

export const after = function after(
  this: Function,
  callback: Function
): Function {
  const self = this
  return function (this: any) {
    const result = self.apply(this, arguments)
    callback.apply(this, arguments)
    return result
  }
}

export const curry = function curry(this: Function, ...args: any[]): any {
  if (args.length < this.length) {
    return curry.bind(this, ...args)
  }
  return this(...args)
}

export const compose = function compose(this: Function, ...args: any[]): any {
  return [this, ...args].reduce((prev, current) => {
    return (...args: any[]) => prev(current(...args))
  })
}

export const pipe = function pipe(this: Function, ...args: any[]): any {
  return [this, ...args].reduceRight((prev, current) => {
    return (...args: any[]) => prev(current(...args))
  })
}

export const install = (): void => {
  Object.assign(Function.prototype, {
    before,
    after,
    curry,
    compose,
    pipe
  })
}
