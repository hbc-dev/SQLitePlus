const DatabaseManager = require('../src/DatabaseManager');

const db = new DatabaseManager({file: true}, `db.sqlite`)
db.src = 'db'//set the actual db

let myDB = db.db

//db.setData(['Usuarios', {myUser: 90}, true], ['Guilds', {myGuild: 90}, true])
db.createTables([
  'Usuarios',
  {
    myUser: {
      name: null, siuu: true
    }
  },
    true],
  [
    'Guilds',
    {
      myGuild: 'XD',
      data: {
        name: 'LOL'
      }
    },
    true],
  [
    'Test',
    {
      myGuild: {
        name: null,
        data: {
          year: 2022,
          day: undefined
        }
      }
    },
    true])

//myDB.prepare(`INSERT INTO Guilds(data) VALUES(?)`).run([JSON.stringify({name:'Lol'})])

//console.log(JSON.parse(myDB.replace(/^'|'$/gm, ''))) | A saber para que es esto xd

console.time()
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
    myGuild: 'XD',
    data: {
      name: 'LOL'
    }
}
])

//let myGet = myDB.prepare(`SELECT * FROM Guilds WHERE myGuild='{"data":{"name":"Hugo"}}'`).get()
console.log(myGet)
console.timeEnd()
