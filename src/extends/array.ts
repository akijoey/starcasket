const swap = function swap(this: any[], x: number, y: number): any[] {
  this[x] = this.splice(y, 1, this[x])[0]
  return this
}

const shuffle = function shuffle(this: any[]): any {
  for (let i = this.length; i > 0; i--) {
    swap.call(this, i - 1, Math.floor(Math.random() * i))
  }
  return this
}

const unique = function unique(this: any[]): any {
  return [...new Set(this)]
}

const partition = function partition(
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

const install = (): void => {
  Object.assign(Array.prototype, {
    swap,
    shuffle,
    unique,
    partition
  })
}

export { swap, shuffle, unique, partition, install }
