const {resolve} = require('node:path')
const ManagerConfig = require('../src/ManagerConfig')

const config = new ManagerConfig({
  defaultFileStorage: __dirname,
  defaultPoint: "test/db OR test/NONAME_test OR db OR NONAME OR :memory:",
});
config.addDatabase('db', {
  createIfNotExists: true,
  models: [
    [
      "Usuarios",
      {
        myUser: {
          info: {name: 'user', mail: null, lastname: null},
          siuu: {xd: 'xd'}
        },
        myGuild: `I can push quotes '''`
      }
    ],
    [
      "Guilds",
      {
        myGuild: 'XD',
        data: {
          name: 'LOL'
        },
        lmao: []
      }
    ],
    [
      "Test",
      {
        myGuild: {
          name: null,
          data: {
            year: 2022,
            day: null
          }
        }
      }
    ]
  ]
});

config.addDatabase('NONAME_test', {
  createIfNotExists: true,
  forceLoad: true,
  close: false,
  models: [
    [
      'Container',
      {
        pointerKey: null,
        data: null
      }
    ]
  ]
});

config.addDatabase('myDB', {
  createIfNotExists: true,
  forceLoad: true,
  models: [
    [
      'Users',
      {
        points: 0,
        id: null,
        username: null
      }
    ],
    [
      'Pointer',
      {
        key: null,
        data: null
      }
    ]
  ]
});

config.cloneDatabase({name: 'NONAME', clone: 'NONAME_test'})
module.exports = config;

/*
  Estructura:

  {
    defaultPoint: String, // para establecer la db desde el inicio
    defaultFileStorage: String, // para establecer una ruta por defecto de dónde crear o buscar bases de datos

    dbName: {
      createIfNotExists: Boolean, // si quieres crear la db si no existe
      path: String, // la ruta del archivo
      close: Boolean, // si quieres cerrar o no las transiciones a la base de datos
      models: Array, // el modelo que tendrá la base de datos
      forceLoad: Boolean, // si la base debe ser forzada a cargarse dentro del manejador aunque no se referencie
    }
  }
*/
