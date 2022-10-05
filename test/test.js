const DatabaseManager = require('../src/DatabaseManager'),
      Models = require('./models.js'),
      { resolve, join, sep } = require('path'),
      getFolder = require('../src/functions/getFolder')

const db = new DatabaseManager({file: true, configPath: './config.js'});

db.insert([
  "Usuarios",
  {
    myUser: {
      info: {name: '327'},
      siuu: 'xdd'
    },
  }
]);

let getter = db.get([
  "Usuarios",
  {
    myUser: {
      info: {name: '327'}
    }
  }
]);

console.log(getter)
