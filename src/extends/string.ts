export const toCapitalize = function toCapitalize(this: string): string {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

export const install = (): void => {
  Object.assign(String.prototype, {
    toCapitalize
  })
}
