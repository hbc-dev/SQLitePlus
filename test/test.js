const DatabaseManager = require('../src/DatabaseManager'),
      Models = require('./models.js')

const db = new DatabaseManager({file: true, configPath: './config.js'}, 'db.sqlite')

db.src = 'db'//set the actual db

let myDB = db.db
db.createTables(...Models)

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

let myGet = db.get([
  'Guilds',
  {
   data: {name: 'Lol'},
}
])

console.time()
console.log(myGet)
console.timeEnd()
