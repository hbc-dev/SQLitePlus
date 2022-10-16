const {resolve} = require('node:path')
const {ManagerConfig} = require('../src/DatabaseManager')

const config = new ManagerConfig({
    defaultFileStorage: __dirname,
    defaultPoint: 'accounts'
});

config.addDatabase('accounts', {
    createIfNotExists: true,
    models: [
        [
            "Accounts",
            {
                username: null,
                password: null,
                mail: null,
                createdAt: null,
                token: null,
                id: null,
                language: 'en',
                games: {
                    game_1: null,
                    game_2: null,
                    game_3: null
                }
            },
            {
                createIfNotExists: true
            }
        ],
        [
            "GamesCredentials",
            {
                gameId: null,
                accountId: null,
                inventoryId: null
            },
            {
                createIfNotExists: true
            }
        ]
    ]
});

config.addDatabase('games', {
    createIfNotExists: true,
    models: [
        [
            "Inventory",
            {
                gameId: null,
                objectId: null,
                count: 0,
                achievedAt: null
            },
            {
                createIfNotExists: true
            }
        ]
    ]
});

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
