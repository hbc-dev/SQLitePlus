const moduleErr = require('../../utils/moduleErr.js')
const __getTableName = require('../function/__getTablesName.js')
const __filterData = require('../function/__filterData.js')
const __addValues = require('../function/__addValues.js')
const __tablesValues = require('../function/__tablesValues.js')
const methods = require('./loader.js')

//ASYNC FUNCTIONS - 🐱‍👤-
  async function insertDataAsync(db = null, opts = {tableName: null, rows: null, objectPrefix: '$', command: null, autoCommand: true}, data = []) {
    let length = data.length ?? Object.keys(data).length;

    if (!db) throw new moduleErr('Añade una base de datos válida')
    if (length < 1) throw new moduleErr('¡Agrega datos a guardar!')
    if (!opts.autoCommand && !opts.command) throw new moduleErr('¡Agrega una sentencia de SQLite!')

    //set the other options
    opts.tableName = opts.tableName ?? __getTableName(db);
    opts.objectPrefix = opts.objectPrefix ?? '$';

      let typeofData = opts.autoCommand ? `INSERT INTO ${opts.tableName}(${opts.rows??''})` : '';
      opts.command = typeofData+' '+(opts.command??'')+''+(opts.autoCommand ? __addValues('insert', data) : '');

      data = __filterData(data, 'insert', opts.command, opts.objectPrefix)

      //RETURN INSERT DATA
      return await methods.async.insert(db, data.command, data.data)
  }

  async function getDataAsync(db = null, opts = {type: 'all', tableName: null, rows: `*`, objectPrefix: '$', command: null, autoCommand: true}, data = []) {
    if (!db) throw new moduleErr('Añade una base de datos válida')

      if (!opts?.tableName) opts.tableName = __getTableName(db)
      if (!opts?.rows) opts.rows = `*`
      if (!opts.autoCommand && !opts.command) throw new moduleErr('¡Agrega una sentencia de SQLite!')

      //set var
      opts.objectPrefix = opts.objectPrefix ?? '$';
      opts.type = opts.type == 'all' ? 'all' : 'one';
      opts.command = opts.command ? opts.command : '';

      opts.command = opts?.autoCommand ? `SELECT ${opts.rows} FROM ${opts.tableName}`+' '+(opts.command??'') : '';
      data = __filterData(data, 'get', opts.command, opts?.objectPrefix)

      //RETURN DATA
      return await methods.async.get(db, data.command, data.data, opts.type)
  }

  async function updateDataAsync(db = null, opts = {tableName: null, objectPrefix: '$', command: null, autoCommand: true}, data = []) {
    if (!db) throw new moduleErr('Añade una base de datos válida')
    if (!opts.autoCommand && !opts.command) throw new moduleErr('¡Agrega una sentencia de SQLite!')

    //set the other options
      opts.tableName = opts.tableName ?? __getTableName(db);
      opts.objectPrefix = opts.objectPrefix ?? '$';
      opts.command = opts.command ? opts.command : '';

      let typeofData = opts?.autoCommand ? `UPDATE ${opts.tableName} SET` : '';
      data = __filterData(data, 'update', typeofData+' '+opts.command, opts.objectPrefix)

      //RETURN UPDATE DATA
      return methods.async.update(db, data.command, data.data)
  }

  async function createTableAsync(db = null, name = null, rows = null, typeData = null, opts = {ifnotexists: true}) {
    if (!db) throw new moduleErr('Añade una base de datos válida')
    if (!name) throw new moduleErr('Añade un nombre para la tabla')
    if (!rows) throw new moduleErr('¡Agrega al menos una columna!')
    if (!Array.isArray(rows)) throw new moduleErr('"rows" debe ser un array')
    if (!Array.isArray(typeData)) throw new moduleErr('"typeData" debe ser un array')

    let command = `CREATE TABLE`+' '+(opts?.ifnotexists ? `IF NOT EXISTS` : '')+' '+name+' '+`(${__tablesValues(rows, typeData)})`;

    return methods.async.createTable(db, command)
  }

//SYNC FUNCTIONS - 🍃 -

  function insertData(db = null, opts = {tableName: null, rows: null, objectPrefix: '$', command: null, autoCommand: true}, data = []) {
  let length = data.length ?? Object.keys(data).length;

  if (!db) throw new moduleErr('Añade una base de datos válida')
  if (length < 1) throw new moduleErr('¡Agrega datos a guardar!')
  if (!opts.autoCommand && !opts.command) throw new moduleErr('¡Agrega una sentencia de SQLite!')

  //set the other options
  opts.tableName = opts.tableName ?? __getTableName(db);
  opts.objectPrefix = opts.objectPrefix ?? '$';

    let typeofData = opts.autoCommand ? `INSERT INTO ${opts.tableName}(${opts.rows??''})` : '';
    opts.command = typeofData+' '+(opts.command??'')+''+(opts.autoCommand ? __addValues('insert', data) : '');

    data = __filterData(data, 'insert', opts.command, opts.objectPrefix)

    //RETURN INSERT DATA
    return methods.sync.insert(db, data.command, data.data)
}

  function getData(db = null, opts = {type: 'all', tableName: null, rows: `*`, objectPrefix: '$', command: null, autoCommand: true}, data = []) {
  if (!db) throw new moduleErr('Añade una base de datos válida')

    if (!opts?.tableName) opts.tableName = __getTableName(db)
    if (!opts?.rows) opts.rows = `*`
    if (!opts.autoCommand && !opts.command) throw new moduleErr('¡Agrega una sentencia de SQLite!')

    //set var
    opts.objectPrefix = opts.objectPrefix ?? '$';
    opts.type = opts.type == 'all' ? 'all' : 'one';
    opts.command = opts.command ? opts.command : '';

    opts.command = opts?.autoCommand ? `SELECT ${opts.rows} FROM ${opts.tableName}`+' '+(opts.command??'') : '';
    data = __filterData(data, 'get', opts.command, opts?.objectPrefix)

    //RETURN DATA
    return methods.sync.get(db, data.command, data.data, opts.type)
}

  function updateData(db = null, opts = {tableName: null, objectPrefix: '$', command: null, autoCommand: true}, data = []) {
  if (!db) throw new moduleErr('Añade una base de datos válida')
  if (!opts.autoCommand && !opts.command) throw new moduleErr('¡Agrega una sentencia de SQLite!')

  //set the other options
    opts.tableName = opts.tableName ?? __getTableName(db);
    opts.objectPrefix = opts.objectPrefix ?? '$';
    opts.command = opts.command ? opts.command : '';

    let typeofData = opts?.autoCommand ? `UPDATE ${opts.tableName} SET` : '';
    data = __filterData(data, 'update', typeofData+' '+opts.command, opts.objectPrefix)

    //RETURN UPDATE DATA
    return methods.sync.update(db, data.command, data.data)
}

  function createTable(db = null, name = null, rows = null, typeData = null, opts = {ifnotexists: true}) {
    if (!db) throw new moduleErr('Añade una base de datos válida')
    if (!name) throw new moduleErr('Añade un nombre para la tabla')
    if (!rows) throw new moduleErr('¡Agrega al menos una columna!')
    if (!Array.isArray(rows)) throw new moduleErr('"rows" debe ser un array')
    if (!Array.isArray(typeData)) throw new moduleErr('"typeData" debe ser un array')

    let command = `CREATE TABLE`+' '+(opts?.ifnotexists ? `IF NOT EXISTS` : '')+' '+name+' '+`(${__tablesValues(rows, typeData)})`;

    return methods.sync.createTable(db, command)
  }

module.exports = {insertDataAsync, insertData, getDataAsync, getData, updateDataAsync, updateData, createTableAsync, createTable}
