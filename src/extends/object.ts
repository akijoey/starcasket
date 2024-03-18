export const inherit = (Child: any, Parent: any): void => {
  const prototype = Object.create(Parent.prototype)
  prototype.constructor = Child
  Child.prototype = prototype
  Object.setPrototypeOf(Child, Parent)
}

export const cloneDeep = (obj: any): any => {
  const res = (Array.isArray(obj) ? [] : {}) as any
  Object.keys(obj).forEach(key => {
    if (obj[key] !== undefined && typeof obj[key] === 'object') {
      res[key] = cloneDeep(obj[key])
    } else {
      res[key] = obj[key]
    }
  })
  return res
}

export const freezeDeep = (obj: any): any => {
  Object.getOwnPropertyNames(obj).forEach(name => {
    const prop = obj[name]
    if (typeof prop === 'object' && prop !== null) {
      freezeDeep(obj)
    }
  })
  return Object.freeze(obj)
}

export const defaults = (obj: any, ...sources: any[]): any => {
  obj = Object(obj)
  sources.forEach(source => {
    source = Object(source)
    for (const key in source) {
      const value = obj[key]
      if (
        value === undefined ||
        (value === Object.prototype[key] && !obj.hasOwnProperty(key))
      ) {
        obj[key] = source[key]
      }
    }
  })
}

export const install = (): void => {
  Object.assign(Object, {
    inherit,
    cloneDeep,
    freezeDeep,
    defaults
  })
}
