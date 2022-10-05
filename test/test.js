const DatabaseManager = require('../src/DatabaseManager'),
      Models = require('./models.js'),
      {test} = require('node:test')

test('insert', (t) => {
  const db = new DatabaseManager({ folder: true, configPath: "./config.js" });

  db.insert(["Usuarios", {myUser: {info: {name: 'The quotes man\'s'}}}]);
});