export const escape = function escape(this: string): string {
  const regexp = /[&<>"']/g
  const escapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }

  if (this && RegExp(regexp.source).test(this)) {
    return this.replace(regexp, char => escapeMap[char])
  }

  return this.toString()
}

export const unescape = function unescape(this: string): string {
  const regexp = /&(?:amp|lt|gt|quot|#(0+)?39);/g
  const unescapeMap: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'"
  }

  if (this && RegExp(regexp.source).test(this)) {
    return this.replace(regexp, entity => unescapeMap[entity] || "'")
  }

  return this.toString()
}

export const truncate = function truncate(
  this: string,
  length = 0,
  truncation = '...'
): string {
  return this.length > length
    ? this.slice(0, Math.max(length - truncation.length, 0)) + truncate
    : this.toString()
}

export const capitalize = function capitalize(this: string): string {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

export const upperFirst = function upperFirst(this: string): string {
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase()
}

export const lowerFirst = function lowerFirst(this: string): string {
  return this.charAt(0).toLowerCase() + this.slice(1).toUpperCase()
}

export const words = function words(this: string): string[] {
  const regexp =
    /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g

  return this.match(regexp) as string[]
}

export const camelCase = function camelCase(this: string): string {
  return words.call(this).reduce((str, word, index) => {
    word = word.toLowerCase()
    return str + (index ? upperFirst.call(word) : word)
  }, '')
}

export const snakeCase = function snakeCase(this: string): string {
  return words.call(this).reduce((str, word, index) => {
    return str + (index ? '_' : '') + word.toLowerCase()
  }, '')
}

export const kebabCase = function kebabCase(this: string): string {
  return words.call(this).reduce((str, word, index) => {
    return str + (index ? '-' : '') + word.toLowerCase()
  }, '')
}

export const pascalCase = function pascalCase(this: string): string {
  return words.call(this).reduce((str, word) => {
    return str + upperFirst.call(word)
  }, '')
}

export const install = (): void => {
  Object.assign(String.prototype, {
    escape,
    unescape,
    truncate,
    capitalize,
    upperFirst,
    lowerFirst,
    words,
    camelCase,
    snakeCase,
    kebabCase,
    pascalCase
  })
}
