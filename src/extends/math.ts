export const add = function add(augend: number, addend: number) {
  return augend + addend
}

export const subtract = function subtract(minuend: number, subtrahend: number) {
  return minuend - subtrahend
}

export const multiply = function multiply(multiplier: number, multiplicand: number) {
  return multiplier * multiplicand
}

export const divide = function divide(dividend: number, divisor: number) {
  return dividend / divisor
}

export const sum = function sum(...args: number[]) {
  return args.reduce((sum, num) => sum + num, 0)
}

export const mean = function mean(...args: number[]) {
  return sum(...args) / args.length
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

export const digits = function digits(num: number): number {
  return num.toString().split('.')[1]?.length ?? 0
}

export const fract = function fract(num: number): number {
  return Number((num % 1).toFixed(digits(num)))
}

export const install = (): void => {
  Object.assign(Math, {
    add,
    subtract,
    multiply,
    divide,
    sum,
    mean,
    roundTo,
    floorTo,
    ceilTo,
    digits,
    fract
  })
}
