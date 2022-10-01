const {resolve} = require('path')

module.exports = {
  defaultPoint: "test/db OR NONAME_test OR myDB OR :memory:",
  defaultFileStorage: __dirname,

  db: {
    createIfNotExists: true,
    models: [
      [
        "Usuarios",
        {
          myUser: {
            name: null,
            siuu: true,
          },
        },
      ],
      [
        "Guilds",
        {
          myGuild: "XD",
          data: {
            name: "LOL",
          },
        },
      ],
      [
        "Test",
        {
          myGuild: {
            name: null,
            data: {
              year: 2022,
              day: undefined,
            },
          },
        },
      ],
    ],
  },
  NONAME: {
    createIfNotExists: true,
    forceLoad: true,
    models: [
      [
        'Container',
        {
          pointerKey: null,
          data: null
        }
      ]
    ]
  },
  myDB: {
    createIfNotExists: true,
    forceLoad: true,
  },
};

/*
  Estructura:

  {
    defaultPoint: String, // para establecer la db desde el inicio
    defaultFileStorage: String, // para establecer una ruta por defecto de dónde crear o buscar bases de datos
    exclude: Array, // para excluir bases de datos del manejador

    dbName: {
      createIfNotExists: Boolean, // si quieres crear la db si no existe
      path: String, // la ruta del archivo
      open: Boolean, // si quieres cerrar o no las transiciones a la base de datos
      models: Array, // el modelo que tendrá la base de datos
      forceLoad: Boolean, // si la base debe ser forzada a cargarse dentro del manejador aunque no se referencie
    }
  }
*/
