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

const install = (): void => {
  Object.assign(Array.prototype, {
    swap,
    shuffle,
    unique
  })
}

export { swap, shuffle, unique, install }
