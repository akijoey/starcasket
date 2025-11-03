import * as objectExports from './extends/object'
import * as functionExports from './extends/function'
import * as stringExports from './extends/string'
import * as numberExports from './extends/number'
import * as arrayExports from './extends/array'
import * as mathExports from './extends/math'
import * as dateExports from './extends/date'
import * as imageExports from './extends/image'
import * as timerExports from './encaps/timer'
import * as requestExports from './encaps/request'
import * as copyExports from './encaps/copy'
import * as fileExports from './encaps/file'

const stars = [
  objectExports,
  functionExports,
  stringExports,
  numberExports,
  arrayExports,
  mathExports,
  dateExports,
  imageExports,
  timerExports,
  requestExports,
  copyExports,
  fileExports
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
