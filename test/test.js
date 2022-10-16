const {DatabaseManager} = require('../src/DatabaseManager'),
      Models = require('./models.js')

const db = new DatabaseManager({ file: true, configPath: "./config.js" });