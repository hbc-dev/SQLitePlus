const path = require('path')
const fs = require('fs')
const moduleErr = require('../../utils/moduleErr.js')

function searchConfig(directory) {
  //para buscar el archivo de configuración de las bases de datos
  if (!directory) return null
  // console.time()
  // console.log(process.cwd())
  // console.timeEnd()
  //
  // console.time()
  // console.log(__dirname)
  // console.timeEnd()
  directory = path.resolve(directory)


  if (!fs.existsSync(directory)) throw new moduleErr('La ruta no existe, no se pudo encontrar nada')
  else if (!directory.endsWith('.js')) throw new moduleErr('Solo se aceptan archivos JavaScript')

  directory = require(directory)
  return directory
}

module.exports = searchConfig
