type Timer = (
  callback: Function,
  delay: number | undefined
) => (this: any, ...args: any[]) => void

const debounce: Timer = function debounce(callback, delay) {
  let timer: NodeJS.Timeout | undefined
  return function (...args) {
    if (timer !== undefined) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      callback.call(this, ...args)
    }, delay)
  }
}

const throttle: Timer = function throttle(callback, delay) {
  let vaild = true
  return function (...args) {
    if (vaild) {
      callback.call(this, ...args)
      vaild = false
      setTimeout(() => {
        vaild = true
      }, delay)
    }
  }
}

const install = (): void => {
  Object.assign(globalThis, {
    debounce,
    throttle
  })
}

export { debounce, throttle, install }
