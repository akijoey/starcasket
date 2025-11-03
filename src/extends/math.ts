export const digits = function digits(num: number): number {
  return num.toString().split('.')[1]?.length ?? 0
}

export const fract = function fract(num: number): number {
  return Number((num % 1).toFixed(digits(num)))
}

export const install = (): void => {
  Object.assign(Math, {
    digits,
    fract
  })
}
