const moduleErr = require('../../utils/moduleErr.js')

function searcher(name, folders, files) {
  let folder = name.match(/[^\/]+/),
      db = name.match(/[^\/]+$/)

  if (folder && name.split('').includes('/')) {
    if (!folders) throw new moduleErr('No hay carpetas cargadas')
    if (!folders[folder]) throw new moduleErr(`La carpeta ${folder} no existe o no está cargada`)

    folder = folders[folder]

    if (!folder[db]) throw new moduleErr(`La base de datos ${db} no existe o no está cargada`)

    return folder[db]
  } else {

    if (!files) throw new moduleErr(`No hay archivos cargados`)
    if (!files[db]) throw new moduleErr(`La base de datos "${db}" no existe o no está cargada`)

    return files[db]
  }
}

module.exports = searcher
/*

Sintaxis:

db.src = db
db.src = proyect/db
 */
