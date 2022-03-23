const moduleErr = require('../../../utils/moduleErr.js')

function getData(db, command, data, type) {
  if (!db) throw new moduleErr('Añade una base de datos válida')

    if (type == 'all') {
      try {
          return db.prepare(command).all(data)
      } catch(e) {
        throw new moduleErr(`¡A ocurrido un error! Más información:\n${e.message}`)
      }
    } else if (type == 'one') {
        try {
          return db.prepare(command).get(data)
        } catch(e) {
          throw new moduleErr(`¡A ocurrido un error! Más información:\n${e.message}`)
        }
    } else throw new moduleErr(`No se ha reconocido el tipo ${type}`)
}

module.exports = getData;
