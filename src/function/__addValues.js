const moduleErr = require('../../utils/moduleErr.js')

function __addValues(type, data) {
  if (!type || typeof type !== 'string') throw new moduleErr('Añade el tipo de función')

  let stament = ''
  type = type.toLowerCase()

  if (!['insert'].includes(type)) throw new moduleErr(`El método ${type} no existe`)

  if (!data) throw new moduleErr('Añade los datos a introducir')

  if (type == 'insert' || type == 'get') {
    stament = 'VALUES('
  }

  if (Array.isArray(data)) {
    data = data.forEach(x => stament = stament+'?,')
  } else if (typeof data == 'object') {
    for (let key of Object.keys(data)) {
      stament = stament+key+','
    }
  }

  return stament.replace(/,$/gm, '')+')'
}

module.exports = __addValues
