export const digits = function digits(num: number): number {
  return num.toString().split('.')[1]?.length ?? 0
}

export const fract = function fract(num: number): number {
  return Number((num % 1).toFixed(digits(num)))
}

export const roundTo = function roundTo(num: number, precision = 0) {
  return Math.round(Number(num + 'e' + precision)) / Math.pow(10, precision)
}

export const floorTo = function floorTo(num: number, precision = 0) {
  return Math.floor(Number(num + 'e' + precision)) / Math.pow(10, precision)
}

export const ceilTo = function ceilTo(num: number, precision = 0) {
  return Math.ceil(Number(num + 'e' + precision)) / Math.pow(10, precision)
}

export const install = (): void => {
  Object.assign(Math, {
    digits,
    fract,
    roundTo,
    floorTo,
    ceilTo
  })
}
