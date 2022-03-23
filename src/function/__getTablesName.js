const moduleErr = require('../../utils/moduleErr.js')

function __getTableName(db) {
  let result;
  try {
    result = db.prepare(`SELECT name FROM sqlite_master WHERE type='table'`).all()[0].name
  } catch (e) {
    throw new moduleErr(`Ha ocurrido un error. Puede deberse a que la base de datos no exista, más información:\n${e.message}`)
  }

  return result
}

module.exports = __getTableName
