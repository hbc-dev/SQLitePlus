const moduleErr = require('../../utils/moduleErr.js')

function searcher(name, folders, files) {
  let options = name.split(/ OR | or /gm);
  let i = 0;

  for (let option of options) {
    let folder = option.match(/(?<=).*(?=\/)/),
      db = option.match(/[^\/]+$/)[0];

    if (folder && name.split('').includes('/')) {
      if (!folders && i == options.length-1) throw new moduleErr('No hay carpetas cargadas')
      if (!folders[folder[0]] && i == options.length-1) throw new moduleErr(`La carpeta ${folder} no existe o no está cargada`)

      folder = folders[folder[0]] ?? {};

      if (!folder[db] && i == options.length-1) throw new moduleErr(`La base de datos ${db} no existe o no está cargada`)
      else if (i < options.length-1 && !folder[db]) {i++;continue};

      return folder[db]
    } else {
      if (db.toLowerCase() == ':memory:') return db;
      if (!files && i == options.length-1) throw new moduleErr(`No hay archivos cargados`)
      if (!files[db] && i == options.length-1) throw new moduleErr(`La base de datos "${db}" no existe o no está cargada`)
      else if (i < options.length-1 && !files[db]) {i++;continue};

      return files[db]
    }
  }
}

module.exports = searcher
/*

Sintaxis:

db.src = db
db.src = proyect/db
 */
