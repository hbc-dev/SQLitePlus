const DatabaseManager = require('../src/DatabaseManager'),
      Models = require('./models.js')

const db = new DatabaseManager({folder: true, configPath: './config.js'}, '.')

db.src = 'test/db'//set the actual db

let myDB = db.db
db.close({time: 2000}).then(() => console.log('abierta'))
db.open({time: 4000}).then(() => console.log('cerrada'))
return //console.log(db.folders)
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
