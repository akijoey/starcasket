export const head = function head(this: any[]) {
  return this[0]
}

export const tail = function tail(this: any[]) {
  return this.slice(1)
}

export const initial = function initial(this: any[]) {
  return this.slice(0, -1)
}

export const last = function last(this: any[]) {
  return this[this.length - 1]
}

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

export const compact = function compact(this: any[]): any[] {
  return this.filter(Boolean)
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

export const chunk = function chunk(this: any[], size = 1): any[] {
  size = Math.max(Number.parseInt(size), 0)

  if (this.length === 0 || size === 0) {
    return []
  }

  return Array.from({ length: Math.ceil(this.length / size) }, (_, index) => {
    return this.slice(index * size, (index + 1) * size)
  })
}

export const install = (): void => {
  Object.assign(Array.prototype, {
    head,
    tail,
    initial,
    last,
    swap,
    shuffle,
    unique,
    compact,
    partition,
    group,
    chunk
  })
}
