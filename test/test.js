const DatabaseManager = require('../src/DatabaseManager'),
      Models = require('./models.js'),
      { resolve, join, sep } = require('path'),
      getFolder = require('../src/functions/getFolder')

const db = new DatabaseManager({folder: true, configPath: './config.js'})
let myDB = db.db
/* console.log(db.get([
  'Guilds',
  {myGuild: 'XD', data: 1}
])) */

db.createFolder({name: 'relacional', force: true});
db.moveContent({files: 'folders/test', to: 'folders/relacional', exclude: ['data0']});
console.log(db.folders)
//myDB.prepare(`INSERT INTO Guilds(data) VALUES(?)`).run([JSON.stringify({name:'Lol'})])

//console.log(JSON.parse(myDB.replace(/^'|'$/gm, ''))) | A saber para que es esto xd

// let insert = db.insert([
//   'Test',
//   {
//     myGuild: {
//       data: {
//         name: 'El rincón del vago'
//         }
//       }
//     }
//   ])

return;
let myGet = db.get([
  'Guilds',
  {
   data: {name: 'Lol'},
}
])

console.time()
console.log(myGet)
console.timeEnd()
