const moduleErr = require('../utils/moduleErr.js')

class Encrypt {
  constructor(data) {
    if (!data) throw new moduleErr('Añade los datos')
    this.data = data
  }

  encrypt() {
    
  }

  reverse() {

  }
}

module.exports = Encrypt
