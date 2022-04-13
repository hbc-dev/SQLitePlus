const moduleErr = require('../../utils/moduleErr.js')

function searcher(name, ...data) {
  data = data.filter(x => x)
  let filter = [
    'name',
    'open',
    'inTransaction',
    'readonly',
    'memory'
  ]

  data.forEach((item, i) => {//los objetos con las bases de datos

    for (let x of Object.keys(item)) {
      if (x == name) return data = item[x]//para archivitos
      if (filter.some(x => x !== item[x])) {//para las carpetas
        //falta filtrar un par de cosas para que no se cuelen los objetos de las bases de datos reales
        for (let y of Object.keys(item[x])) {
          if (y == name) return data = item[x][y]
        }
      } else return data = null
    }
  });

  return (Array.isArray(data) ? null : data)
}

module.exports = searcher
