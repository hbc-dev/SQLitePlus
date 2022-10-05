const {resolve} = require('node:path')
const {existsSync} = require('node:fs')
const moduleErr = require('../../utils/moduleErr.js')
const model = require('../../utils/model.js')

function searchConfig(directory) {
  //para buscar el archivo de configuración de las bases de datos
  if (!directory) return null
  directory = resolve(directory)


  if (!existsSync(directory)) throw new moduleErr('La ruta no existe, no se pudo encontrar nada')
  else if (!directory.endsWith('.js')) throw new moduleErr('Solo se aceptan archivos JavaScript')

  directory = require(directory)
  if (typeof directory !== 'object') throw new moduleErr('La configuración es un objeto')

  return Object.assign(model, directory)
}

module.exports = searchConfig
