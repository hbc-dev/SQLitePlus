const moduleErr = require('../../../utils/moduleErr.js')

function insertData(db, command, data) {

    try {
      let saved = db.prepare(command).run(data)
      return ({sucess: true, new: saved})
    } catch(e) {
      throw new moduleErr(`¡A ocurrido un error! Más información:\n${e.message}`)
    }
}

module.exports = insertData
