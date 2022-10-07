const DatabaseManager = require('../src/DatabaseManager'),
      Models = require('./models.js')
      //{test} = require('node:test')


const db = new DatabaseManager({ folder: true, configPath: "./config.js" });

db.insert(["Usuarios", {myUser: {info: {name: "tetas '''"}}}]);

let filter = {
  myUser: {
    info: {
      name: "tetas '''"
    }
  },
}

db.delete([
  "Usuarios",
  filter,
]);