import { roundTo, digits } from './math'

export const isNumber = function isNumber(value: unknown): boolean {
  return typeof value === 'number' && !isNaN(value)
}

export const isNegativeZero = function isNegativeZero(num: number): boolean {
  return Object.is(num, -0)
}

export const toSigned = function toSigned(this: number): string {
  return this > 0 ? `+${this}` : this.toString()
}

export const toPercent = function toPercent(this: number): string {
  return roundTo(this * 100, digits(this) - 2) + '%'
}

export const install = (): void => {
  Object.assign(Number, {
    isNumber,
    isNegativeZero
  })
  Object.assign(Number.prototype, {
    toSigned,
    toPercent
  })
}
