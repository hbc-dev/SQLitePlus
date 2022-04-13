const moduleErr = require('../utils/moduleErr.js'),
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
        final = final+`'${this.convert(JSON.stringify(this.data[column]), 'return')}'`
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
      else if (typeof data[key] == 'object') array.push('::Object::') && rawData.push([key, data[key], position])
      else array.push(data[key])

      if (principalData.length < 1) array.push({position: 0, in: false})
      else array.push({position: 0, in: false})

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

        if (typeof value == 'object' && !Array.isArray(value)) unResolved.push([key, value, item[2]+1]) && resolvedRaw.push([key, '::Object::', {position: item[2], in: item[0]}])
        else resolvedRaw.push([key, item[1][key], {position: item[2]+1, in: item[0]}])
      }
    }

    return {resolved: resolvedRaw, peding: unResolved}
  }
}

module.exports = Stament
