const DatabaseManager = require('../src/DatabaseManager'),
      Models = require('./models.js')

const db = new DatabaseManager({file: true}, `db.sqlite`)
//console.log(db)
db.src = 'db'//set the actual db

let myDB = db.db
//db.setData(['Usuarios', {myUser: 90}, true], ['Guilds', {myGuild: 90}, true])
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
    myGuild: {data: {name: 'Angelina'}},
    data: {
      name: 'LOL'
    }
}
])

console.time()
console.log(myGet)
console.timeEnd()
