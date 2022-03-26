const moduleErr = require('../../../utils/moduleErr.js')

async function createTable(db, command) {

  return await new Promise(r => {
    try {
      let saved = db.prepare(command).run()
      r({sucess: true, new: saved})
    } catch(e) {
      throw new moduleErr(`¡A ocurrido un error! Más información:\n${e.message}`)
    }
  });
}

module.exports = createTable;
