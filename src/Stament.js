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
    this.table = data[0]//el nombre de la tabla
    this.data = data[1]//los datos
    this.rest = data[2]//el resto, pueden ser muchas weas xd
    this.idGenerator = 0//para generar ids
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
    let myResultDB = [],
        group = {},
        count = 0,
        iterable,
        keys = [],
        key;

    for (let object of db.values()) {
      iterable = Object.keys(object)
      count = iterable.length
      keys.push(...iterable)

        for (count;count>=1;count--) {
          key = keys[0]

          try {
              group[key] = JSON.parse(object[key])
              //console.log(object[key])
          } catch (e) {
              group[key] = object[key]
          }

          keys.shift()
        }

        myResultDB.push(group)
        group = {}
      }

    return myResultDB
  }

  simplifyData(data, principalData, {clearIDs=true, groups=true} = {}) {
    //hay que hacer agrupaciones para que los id sean iguales
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
    else if (typeof data[key] == 'object' && data[key]) array.push('::Object::') && rawData.push([key, data[key], position, key, this.idGenerator])
    else array.push(data[key])

    array.push({position: 0, in: false, column: key, values: data[key], id: this.idGenerator})

    principalData.push(array)
    this.idGenerator++
  }

  if (rawData.length > 0) {
    for (let i = 0;i<100;i++) {
      let myUnresolvedData = this.rawDataConvert(rawData)
      myUnresolvedData.resolved.forEach(item => principalData.push(item))

      rawData = myUnresolvedData.peding
      if (rawData.length < 1) break;
    }
  }

  if (clearIDs) this.idGenerator = 0
  return {simplify: principalData}
}

  rawDataConvert(raw, groups) {
  let unResolved = [],
      resolvedRaw = []

  for (let item of raw.values()) {
    let keys = Object.keys(item[1])

    for (let key of keys) {
      let array = [],
          value = item[1][key]

      if (typeof value == 'object' && !Array.isArray(value)) unResolved.push([key, value, item[2]+1, item[3], item[4]]) && resolvedRaw.push([key, '::Object::', {position: item[2]+1, in: item[0], column: item[3], id: item[4]}])
      else resolvedRaw.push([key, item[1][key], {position: item[2]+1, in: item[0], column: item[3], id: item[4]}])
    }
  }

  return {resolved: resolvedRaw, peding: unResolved}
}

  filter(toSearch, db, myFilteredData) {
    /*
      buscar entre 2 arrays. Diferencia entre lo que se pide y lo que tiene
    */

   let iterable = db.filter(x => x[2].position == toSearch[2].position).values(),
       checker = false

    //data => [key, value, {position: Number, in: PositionName, column: Column}]

  for (let data of iterable) {
    let key = {fromDB: data[0], toSearch: toSearch[0]},
        value = {fromDB: data[1], toSearch: toSearch[1]},
        info = {fromDB: data[2], toSearch: toSearch[2]},
        array = {
          fromDB: [
            key.fromDB, value.fromDB, {position: info.fromDB.position, in: info.fromDB.in, column: info.fromDB.column}
          ],
          toSearch: [
            key.toSearch, value.toSearch, {position: info.toSearch.position, in: info.toSearch.in, column: info.toSearch.column}
          ]
        }

        if (myFilteredData.length < 1 && lodashArray.isEqual(array.fromDB, array.toSearch)) {
          myFilteredData.push(data)
          checker = true
        } else if (lodashArray.isEqual(array.fromDB, array.toSearch)) {
          if (info.fromDB.id !== myFilteredData[0][2].id) {
            //return console.log(db.filter(x => x[2].id == data[2].id && x[2].position == 0)
            myFilteredData.pop()
            myFilteredData.push(db.filter(x => x[2].id == data[2].id && x[2].position == 0)[0])
            checker = true
            //está casi conseguido, pero por alguna razón retorna los corchetes 🤷‍♀️
          } else {
            checker = true
            myFilteredData.push(db.filter(x => x[2].id == data[2].id && x[2].position == 0)[0])
          }
        }
    }

    return !checker ? [] : myFilteredData
  }

  clearIDs() {
    this.idGenerator = 0
  }
}

module.exports = Stament
/*Añadir las siguientes funciones:
  - condition(callback): Es un string. Es una condición pura y dura con sintaxis simple y legible
  - setFunct(name, callback): Es un string. Transporta varias condiciones a examinar
  - funct(name): Es un string. Usa una función creada

  Sintaxis:
  ! => No existe
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
