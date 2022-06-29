const DatabaseManager = require('../src/DatabaseManager'),
      Models = require('./models.js'),
      { resolve } = require('path')

const db = new DatabaseManager({file: true, configPath: './config.js'}, 'myDB.sqlite')

let myDB = db.db
/* console.log(db.get([
  'Guilds',
  {myGuild: 'XD', data: 1}
])) */
return;

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
