const DatabaseManager = require('../src/DatabaseManager'),
      Models = require('./models.js')
      //{test} = require('node:test')


const db = new DatabaseManager({ folder: true, configPath: "./config.js" });

//db.insert(["Usuarios", { myUser: { info: { name: "The quotes man's" } } }]);

let filter = {myGuild: "I can push quotes '''"}

db.update([
  "Usuarios",
  filter,
  null
]);

// db.update([
//   "Usuarios",
//   filter,
//   {
//     myUser: {
//       info: {name: "The quotes man's"}
//     }
//   }
// ])1