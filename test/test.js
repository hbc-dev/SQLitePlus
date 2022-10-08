const {DatabaseManager} = require('../src/DatabaseManager'),
      Models = require('./models.js')
      //{test} = require('node:test')


const db = new DatabaseManager({ folder: true, configPath: "./config.js" });

db.addFolders('.')
console.log(db)