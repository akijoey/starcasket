export const format = function format(
  this: Date,
  fmt = 'YYYY-MM-DDTHH:mm:ss.SSS'
) {
  const options = {
    'M+': this.getMonth() + 1,
    'D+': this.getDate(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    SSS: this.getMilliseconds()
  }

  const yearRegexp = /(Y+)/
  if (yearRegexp.test(fmt)) {
    fmt = fmt.replace(yearRegexp, match => {
      return this.getFullYear().toString().slice(-match.length)
    })
  }

  for (const [key, value] of Object.entries(options)) {
    const regexp = new RegExp(`(${key})`)
    if (regexp.test(fmt)) {
      fmt = fmt.replace(regexp, match => {
        return match.length === 1 ? value : value.toString().padStart(2, '0')
      })
    }
  }

  return fmt
}

export const install = (): void => {
  Object.assign(Date.prototype, {
    format
  })
}
