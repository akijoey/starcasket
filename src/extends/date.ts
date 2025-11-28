export type DateSource = Date | string | number

export const unix = function unix(timestamp: number): number {
  return new Date(timestamp * 1000).getTime()
}

export const offset = function offset(timeZone?: string, date?: Date): number {
  date = date ?? new Date()
  const timestamp = new Date(
    date.toLocaleString('en-US', { timeZone })
  ).getTime()
  const offset =
    date.getTimezoneOffset() - Math.round((timestamp - date.getTime()) / 60000)

  return offset
}

export const zone = function zone(
  timeZone?: string,
  formatISO?: boolean,
  date?: Date
): string {
  const value = offset(timeZone, date)
  const sign = value > 0 ? '-' : '+'
  const hours = Math.abs(Math.floor(value) / 60)
    .toString()
    .padStart(2, '0')
  const minutes = Math.abs(value % 60)
    .toString()
    .padStart(2, '0')

  return `${sign}${hours}${formatISO ? ':' : ''}${minutes}`
}

export const parseZone = function parseZone(
  dateString: string,
  timeZone?: string
) {
  const date = new Date(dateString)

  return new Date(
    date.getTime() - (date.getTimezoneOffset() - offset(timeZone, date)) * 60000
  ).getTime()
}

export const format = function format(
  this: Date,
  fmt?: string,
  timeZone?: string
) {
  fmt = fmt ?? 'YYYY-MM-DDTHH:mm:ssZ'
  const regexp =
    /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g
  const date = new Date(this.toLocaleString('en-US', { timeZone }))
  const matches: { [key: string]: string } = {
    YY: date.getFullYear().toString().slice(-2),
    YYYY: date.getFullYear().toString(),
    M: (date.getMonth() + 1).toString(),
    MM: (date.getMonth() + 1).toString().padStart(2, '0'),
    MMM: getShortMonth.call(date),
    MMMM: getLongMonth.call(date),
    D: date.getDate().toString(),
    DD: date.getDate().toString().padStart(2, '0'),
    d: date.getDay().toString(),
    dd: getShortDay.call(date).slice(0, 2),
    ddd: getShortDay.call(date),
    dddd: getLongDay.call(date),
    H: date.getHours().toString(),
    HH: date.getHours().toString().padStart(2, '0'),
    h: getTwelveHours.call(date).toString(),
    hh: getTwelveHours.call(date).toString().padStart(2, '0'),
    A: getDayPeriod.call(date),
    a: getDayPeriod.call(date).toLowerCase(),
    m: date.getMinutes().toString(),
    mm: date.getMinutes().toString().padStart(2, '0'),
    s: date.getSeconds().toString(),
    ss: date.getSeconds().toString().padStart(2, '0'),
    SSS: this.getMilliseconds().toString(),
    Z: zone(timeZone, true, this),
    ZZ: zone(timeZone, false, this)
  }

  return fmt.replace(regexp, (match, escape) => escape || matches[match])
}

export const getUnix = function getUnix(this: Date) {
  return Math.floor(this.getTime() / 1000)
}

export const getTimeZone = function getTimeZone(this: Date) {
  return new Intl.DateTimeFormat().resolvedOptions().timeZone
}

export const getDayPeriod = function getTimePeriod(this: Date) {
  return this.getHours() < 12 ? 'AM' : 'PM'
}

export const getTwelveHours = function getTwelveHours(this: Date) {
  const hours = this.getHours() % 12

  return hours !== 0 ? hours : 12
}

export const getLongDay = function getLongDay(this: Date) {
  return this.toLocaleString('en-US', { weekday: 'long' })
}

export const getShortDay = function getShortDay(this: Date) {
  return this.toLocaleString('en-US', { weekday: 'short' })
}

export const getLongMonth = function getLongMonth(this: Date) {
  return this.toLocaleString('en-US', { month: 'long' })
}

export const getShortMonth = function getShortMonth(this: Date) {
  return this.toLocaleString('en-US', { month: 'short' })
}

export const addMilliseconds = function addMilliseconds(
  this: Date,
  ms: number
) {
  return this.setMilliseconds(this.getMilliseconds() + ms)
}

export const addSeconds = function addSeconds(this: Date, seconds: number) {
  return this.setSeconds(this.getSeconds() + seconds)
}

export const addMinutes = function addMinutes(this: Date, minutes: number) {
  return this.setMinutes(this.getMinutes() + minutes)
}

export const addHours = function addHours(this: Date, hours: number) {
  return this.setHours(this.getHours() + hours)
}

export const addDays = function addDays(this: Date, days: number) {
  return this.setDate(this.getDate() + days)
}

export const addMonths = function addMonths(this: Date, months: number) {
  return this.setMonth(this.getMonth() + months)
}

export const addYears = function addYears(this: Date, years: number) {
  return this.setFullYear(this.getFullYear() + years)
}

export const subtractMilliseconds = function subtractMilliseconds(
  this: Date,
  ms: number
) {
  return this.setMilliseconds(this.getMilliseconds() - ms)
}

export const subtractSeconds = function subtractSeconds(
  this: Date,
  seconds: number
) {
  return this.setSeconds(this.getSeconds() - seconds)
}

export const subtractMinutes = function subtractMinutes(
  this: Date,
  minutes: number
) {
  return this.setMinutes(this.getMinutes() - minutes)
}

export const subtractHours = function subtractHours(this: Date, hours: number) {
  return this.setHours(this.getHours() - hours)
}

export const subtractDays = function subtractDays(this: Date, days: number) {
  return this.setDate(this.getDate() - days)
}

export const subtractMonths = function subtractMonths(
  this: Date,
  months: number
) {
  return this.setMonth(this.getMonth() - months)
}

export const subtractYears = function subtractYears(this: Date, years: number) {
  return this.setFullYear(this.getFullYear() - years)
}

export const startOfSeconds = function startOfSeconds(this: Date) {
  return this.setMilliseconds(0)
}

export const startOfMinutes = function startOfMinutes(this: Date) {
  return this.setSeconds(0, 0)
}

export const startOfHours = function startOfHours(this: Date) {
  return this.setMinutes(0, 0, 0)
}

export const startOfDay = function startOfDay(this: Date) {
  return this.setHours(0, 0, 0, 0)
}

export const startOfMonth = function startOfMonth(this: Date) {
  this.setDate(1)

  return startOfDay.call(this)
}

export const startOfYear = function startOfYear(this: Date) {
  this.setMonth(0, 1)

  return startOfDay.call(this)
}

export const endOfSeconds = function endOfSeconds(this: Date) {
  return this.setMilliseconds(999)
}

export const endOfMinutes = function endOfMinutes(this: Date) {
  return this.setSeconds(59, 999)
}

export const endOfHours = function endOfHours(this: Date) {
  return this.setMinutes(59, 59, 999)
}

export const endOfDay = function endOfDay(this: Date) {
  return this.setHours(23, 59, 59, 999)
}

export const endOfMonth = function endOfMonth(this: Date) {
  this.setMonth(this.getMonth() + 1, 0)

  return endOfDay.call(this)
}

export const endOfYear = function endOfYear(this: Date) {
  this.setMonth(11, 31)

  return endOfDay.call(this)
}

export const isSame = function isBefore(this: Date, date: DateSource): boolean {
  return this.getTime() === new Date(date).getTime()
}

export const isBefore = function isBefore(
  this: Date,
  date: DateSource
): boolean {
  return this.getTime() < new Date(date).getTime()
}

export const isAfter = function isAfter(this: Date, date: DateSource): boolean {
  return this.getTime() > new Date(date).getTime()
}

export const isBetween = function isBefore(
  this: Date,
  before: DateSource,
  after: DateSource
): boolean {
  const time = this.getTime()

  return time > new Date(before).getTime() && time < new Date(after).getTime()
}

export const isLeapYear = function isLeapYear(this: Date) {
  const year = this.getFullYear()

  return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0
}

export const isDST = function isDST(this: Date) {
  return offset('America/New_York', this) === 240
}

export const install = (): void => {
  Object.assign(Date, {
    unix,
    offset,
    zone,
    parseZone
  })
  Object.assign(Date.prototype, {
    format,
    getUnix,
    getTimeZone,
    getDayPeriod,
    getTwelveHours,
    getLongDay,
    getShortDay,
    getLongMonth,
    getShortMonth,
    addSeconds,
    addMinutes,
    addHours,
    addDays,
    addMonths,
    addYears,
    subtractSeconds,
    subtractMinutes,
    subtractHours,
    subtractDays,
    subtractMonths,
    subtractYears,
    startOfSeconds,
    startOfMinutes,
    startOfDay,
    startOfMonth,
    startOfYear,
    endOfSeconds,
    endOfMinutes,
    endOfHours,
    endOfDay,
    endOfMonth,
    endOfYear,
    isSame,
    isBefore,
    isAfter,
    isBetween,
    isLeapYear,
    isDST
  })
}
