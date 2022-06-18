const path = require('path')
const fs = require('fs');
const loader = require('./functions/loader.js')
const searcher = require('./functions/searcher')
const moduleErr = require('../utils/moduleErr.js')
const Stament = require('./Stament.js')
const searchConfig = require('./functions/config.js')
const reloadDatabase = require('./functions/reloadDatabase.js')

class DatabaseManager {
  //private
  #configData

  constructor(opts = {folder: false, file: false, memory: true}, ...path) {
    this.#configData = !opts.configPath ? false : searchConfig(opts.configPath)
    const loaded = loader(opts, path, this.#configData)//Load db files. Default collecting files

    this.data = loaded.memory ?? null;
    this.folders = loaded.folders ?? null;
    this.files = loaded.files ?? null;

    if (opts.folder && opts.file) opts = {file: true, memory: opts.memory}//settings...

    this.db;
  }

  addFiles(...files) {
    let newFiles = loader({file: true}, files)?.files

    if (!this.files) this.files = {}
    this.files = Object.assign(this.files, newFiles)
  }

  addFolders(...folders) {
    console.log(folders)
    let newFolders = loader({folder: true}, folders)?.folders

    if (!this.folders) this.folders = {}
    this.folders = Object.assign(this.folders, newFolders)
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


  //BASE DE DATOS
  set src(name) {
    //si this.db es igual a :memory: que directamente pongamos el this.data
    if (!name) throw new moduleErr('Añade el nombre de la base de datos a usar')
    if (name.toLowerCase() == ':memory:') return this.db = this.data

    const searched = searcher(name, this.folders, this.files)
    this.db = searched
  }

  close({time = null, db = null} = {}) {
    db = db ? searcher(db, this.folders, this.files) : this.db;
    if (!db) throw new moduleErr('No hay ninguna base de datos elegida para cerrar')

    db.close()

    time = Number(time)
    if (time) {
      setTimeout(() => {
        db = reloadDatabase(db)
        if (db.inFolder) this.folders[db.inFolder][db.fileName] = db
        else this.files[db.fileName] = db

        this.db = db
      }, time)
    }
  }

  open({time = null, db = null} = {}) {
    db = db ? searcher(db, this.folders, this.files) : this.db
    if (!db) throw new moduleErr('No hay ninguna base de datos elegida para cerrar')

    db.open(true)

    time = Number(time)
    if (time) {
      setTimeout(() => {
        db.close()
      }, time)
    }
  }

  get(object) {
    let db = this.db
    const myStament = new Stament(object)
    let stament = myStament.create('GET_DATA')

    if (!db) throw new moduleErr('Añade una base de datos sobre la que actuar con "db.src = dbName"')
    let myData = myStament.parseDB(db.prepare(stament.stament).all())

    let raw = [myData, object[1]]
    let rawToSimplify = [[], myStament.simplifyData(raw[1], []).simplify]
    let searched = []

    for (let value of raw[0]) {
      value = myStament.simplifyData(value, [], {clearIDs: false, groups: true}).simplify

      for (let item of value.values()) {
        rawToSimplify[0].push(item)
      }
    }

    myStament.clearIDs()

    for (let value of rawToSimplify[1].values()) {
      searched = myStament.filter(value, rawToSimplify[0], searched)
      rawToSimplify[0] = searched.data

      if (searched.data.length < 1) {
        searched = null
        break;
      }
    }

    if (searched?.data.length > 0) {
      let object = {}

      if (searched.repeat) {
        let id = searched.data[0][2].id
        searched = searched.data.filter(x => x[2].id == id)
      } else searched = searched.data

      for (let data of searched.filter(x => x[2].values).values()) {
        object[data[0]] = data[2].values
      }

      return object
    } else return searched
  }
  //debería de agregar un apartado de opciones

  all(table) {
    let db = this.db
    const myStament = new Stament(table)
    let stament = myStament.create('GET_DATA')

    if (!db) throw new moduleErr('Añade una base de datos sobre la que actuar con "db.src = dbName"')
    let myData = db.prepare(stament.stament).all()

    return myStament.parseDB(myData)
  }

  createTables(...object) {
    let db = this.db,
        config = this.#configData

    if (!db) throw new moduleErr('Añade una base de datos sobre la que actuar')
    if (object.length < 1) throw new moduleErr('Añade tablas para añadir a la base de datos')

    for (let item of object.values()) {
      if (!Array.isArray(item)) throw new moduleErr('Las tablas se representan en Arrays')
      if (item.length < 2) throw new moduleErr('Datos de la tabla incompletos')

      //{createIfNotExists, types}
      //tengo que crear los types, me he quedado por aquí, ve haciendo el readme vago de mierda
      const myStament = new Stament(item).create('NEW_TABLE')
      let data = db.prepare(myStament).run()
    }
  }

  insert(object) {
    let db = this.db

    if (!db) throw new moduleErr('Añade una base de datos sobre la que actuar')
    if (object.length <= 1) throw new moduleErr('Faltan datos')

    if (typeof object[0] !== 'string') throw new moduleErr('Se esparaba como nombre de la table un string')

  }
}

module.exports = DatabaseManager
