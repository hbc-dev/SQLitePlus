const moduleErr = require('../../../utils/moduleErr.js')

function updateData(db, command, data) {

      try {
        let updated = db.prepare(command).run(data)
        return ({sucess: true, new: updated})
      } catch (e) {
        throw new moduleErr(`¡A ocurrido un error! Más información:\n${e.message}`)
      }
}

module.exports = updateData;
