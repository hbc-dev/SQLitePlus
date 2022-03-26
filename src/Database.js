const path = require('path')
const fs = require('fs');
const loader = require('./function/loader.js')
const moduleErr = require('../utils/moduleErr.js')
const __getTableName = require('./function/__getTablesName.js')
const __filterData = require('./function/__filterData.js')
const __addValues = require('./function/__addValues.js')
const methods = require('./methods/loader.js')
const {insertDataAsync, insertData, getDataAsync, getData, updateDataAsync, updateData, createTableAsync, createTable} = require('./methods/functions.js')

class DatabaseManager {
  constructor(opts = {folder: false, file: false, memory: true}, ...path) {
    this.data = loader(opts, path)//Load db files. Default collecting files

    if (opts.folder && opts.file) opts = {file: true, memory: opts.memory}//settings...
    let getTypes = Object.values(opts)

    this.typesDB = Object.fromEntries(Object.entries(opts).filter(([key, value]) => value))
    this.db;
  }

  addFiles(...files) {
    let newFiles = loader({file: true}, files)?.files

    if (!this.data.files) this.data.files = {}
    this.data.files = Object.assign(this.data.files, newFiles)
  }

  addFolders(...folders) {
    let newFolders = loader({folder: true}, folders)?.folders

    if (!this.data.folders) this.data.folders = {}
    this.data.folders = Object.assign(this.data.folders, newFolders)
  }

  createDB(pathway, name) {
    if (!pathway) throw new moduleErr('Añade la ruta donde crear una nueva base de datos')
    if (!name) name = ''
    pathway = path.resolve(pathway)

    try {
      fs.readdirSync(pathway)
    } catch(e) {
      throw new moduleErr(`A ocurrido un error. El error más común es una ruta mal puesta, más información:\n${e.message}`)
    }

    fs.writeFile(pathway+'\\'[0]+name+'.sqlite', '', function(err) {
      if (err) throw new moduleErr(`A ocurrido un error, más información:\n${err.message}`)
    });

    return {sucess: true, pathway: path.resolve(pathway+'/'+name+'.sqlite')}
  }
}

module.exports = {DatabaseManager, insertDataAsync, insertData, getDataAsync, getData, updateDataAsync, updateData, createTableAsync, createTable}
