export const swap = function swap(this: any[], x: number, y: number): any[] {
  this[x] = this.splice(y, 1, this[x])[0]
  return this
}

export const shuffle = function shuffle(this: any[]): any {
  for (let i = this.length; i > 0; i--) {
    swap.call(this, i - 1, Math.floor(Math.random() * i))
  }
  return this
}

export const unique = function unique(this: any[]): any {
  return [...new Set(this)]
}

export const partition = function partition(
  this: any[],
  callback: (item: any, index: number, array: any[]) => any,
  context?: any
): any[] {
  return this.reduce(
    (res, item, index, array) => {
      const cond: boolean = callback.call(context, item, index, array)
      res[cond ? 0 : 1].push(item)
      return res
    },
    [[], []]
  )
}

export const group = function group(
  this: any[],
  callback: (item: any, index: number, array: any[]) => any,
  context?: any
): any[] {
  return this.reduce((res, item, index, array) => {
    const key = callback.call(context, item, index, array)
    if (res.hasOwnProperty(key)) {
      res[key].push(item)
    } else {
      res[key] = [item]
    }
    return res
  }, {})
}

export const install = (): void => {
  Object.assign(Array.prototype, {
    swap,
    shuffle,
    unique,
    partition,
    group
  })
}
