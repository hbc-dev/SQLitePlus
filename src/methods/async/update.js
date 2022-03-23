const moduleErr = require('../../../utils/moduleErr.js')

async function updateData(db, command, data) {

    return new Promise(r => {
      try {
        let updated = db.prepare(command).run(data)
        r({sucess: true, new: updated})
      } catch (e) {
        throw new moduleErr(`¡A ocurrido un error! Más información:\n${e.message}`)
      }
    });
}

module.exports = updateData;
