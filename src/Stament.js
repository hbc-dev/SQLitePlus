const moduleErr = require('../utils/moduleErr.js'),
      lodashArray = require('lodash')
      types = {
        object: 'TEXT',
        string: 'TEXT',
        number: 'INTEGER'
      }

/*
NEW_TABLE: Crea nuevas tablas en la base de datos
ADD_DATA: Guarda nuevos datos en columnas
*/

class Stament {
  constructor(data) {
    this.table = data[0]
    this.data = data[1]
    this.rest = data[2]
  }

  create(type) {
    if (type == 'NEW_TABLE') {
      let base = `CREATE TABLE ${this.rest ? 'IF NOT EXISTS' : ''} ${this.table}(`//la base de la sentencia de sql

      for (let column of Object.keys(this.data)) {
        if (typeof this.data !== 'object') base = base+`${column} ${types[typeof this.data]} DEFAULT ${this.data},`
        else base = base+`${column} ${types[typeof this.data[column]]} DEFAULT '${JSON.stringify(this.data[column])}',`
      }

      return base.replace(/,$/gm, '')+')'
    }

    if (type == 'ADD_DATA') {
      let base = `INSERT INTO ${this.table}(`//la base de la sentencia de sql
      let data = ''
      let final = `VALUES(`

      for (let column of Object.keys(this.data)) {
        data = data+`${column},`
        final = final+`'${JSON.stringify(this.data[column])}'`
      }

      return base+data.replace(/,$/gm, '')+') '+final.replace(/,$/gm, '')+')'
    }

    if (type == 'GET_DATA') {
      let base = `SELECT * FROM ${this.table}`//la base de la sentencia de sql

      return {
        stament: base,
        convert: this.convert
      }
    }
  }

  parseDB(db) {
    let myResultDB = []

    for (let object of db.values()) {
      for (let key of Object.keys(object)) {
        try {
          let toObject = {}
          toObject[key] = JSON.parse(object[key])

          myResultDB.push(toObject)
        } catch (e) {
          let toObject = {}
          toObject[key] = object[key]

          myResultDB.push(toObject)
        }
      }
    }

    return myResultDB
  }

  simplifyData(data, principalData) {
  let rawData = [],
  position;

  try {
    position = principalData.reduce((prev, current) => prev[2].position > current[2].position ? prev : current)[2].position+1
  } catch(e) {
    position = 0
  }

  for (let key of Object.keys(data)) {
    let array = []

    array.push(key)

    if (Array.isArray(data[key])) array.push(data[key])
    else if (typeof data[key] == 'object') array.push('::Object::') && rawData.push([key, data[key], position, key])
    else array.push(data[key])

    array.push({position: 0, in: false, column: key, values: data[key]})

    principalData.push(array)
  }

  if (rawData.length > 0) {
    for (let i = 0;i<100;i++) {
      let myUnresolvedData = this.rawDataConvert(rawData)
      myUnresolvedData.resolved.forEach(item => principalData.push(item))

      rawData = myUnresolvedData.peding
      if (myUnresolvedData.peding.length < 1) break;
    }
  }

  return {simplify: principalData}
}

  rawDataConvert(raw) {
  let unResolved = [],
      resolvedRaw = []

  for (let item of raw.values()) {
    let keys = Object.keys(item[1])

    for (let key of keys) {
      let array = [],
          value = item[1][key]

      if (typeof value == 'object' && !Array.isArray(value)) unResolved.push([key, value, item[2]+1, item[3]]) && resolvedRaw.push([key, '::Object::', {position: item[2], in: item[0], column: item[3]}])
      else resolvedRaw.push([key, item[1][key], {position: item[2]+1, in: item[0], column: item[3]}])
    }
  }

  return {resolved: resolvedRaw, peding: unResolved}
}

  filter(toSearch, db, myFilteredData) {
    /*
      buscar entre 2 arrays. Diferencia entre lo que se pide y lo que tiene
    */

   let iterable = db.values(),
       checker = false

    //data => [key, value, {position: Number, in: PositionName, column: Column}]

  for (let data of iterable) {
    let key = {fromDB: data[0], toSearch: toSearch[0]},
        value = {fromDB: data[1], toSearch: toSearch[1]},
        info = {fromDB: data[2], toSearch: toSearch[2]}

        if (lodashArray.isEqual(toSearch, data)) console.log(data[2].values)
    }

    return !checker ? [] : myFilteredData
  }
}

module.exports = Stament
/*Añadir las siguientes funciones:
  - condition(callback): Es un string. Es una condición pura y dura con sintaxis simple y legible
  - setFunct(name, callback): Es un string. Transporta varias condiciones a examinar
  - funct(name): Es un string. Usa una función creada

  Sintaxis:
  == => Igual
  != => No igual
  AND => Y...
  || => Si es false, examina esto otro...
  > => Mayor que
  < => Menor que
  RegExp => Regex de toda la vida

  Ejem:
  "condition(DB.key == myGuild AND DB.position == 0)"
  "setFunct(myFunction, DB.key != mySticker)"
  "funct(myFunction)"

  Realmente el signo igual es irrelevante si solo buscas un valor exacto
*/
