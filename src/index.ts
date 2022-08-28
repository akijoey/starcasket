import * as arrayExports from './extends/array'
import * as functionExports from './extends/function'
import * as objectExports from './extends/object'
import * as timerExports from './encaps/timer'
import * as requestExports from './encaps/request'

const stars = [
  arrayExports,
  functionExports,
  objectExports,
  timerExports,
  requestExports
]

const starcasket = Object.assign(
  stars.reduce((prev, current) => {
    return Object.assign(prev, { ...current })
  }, {}),
  {
    install: () => {
      stars.forEach(star => star.install())
    }
  }
)

export default starcasket
