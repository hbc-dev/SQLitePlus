module.exports = {
  defaultPoint: "data0",

  db: {
    path: __dirname,
    createIfNotExists: true,
    location: {
      folders: {
        name: "relacional",
        force: true,
      },
    },
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
  data0: {
    createIfNotExists: true,
    forceLoad: true,
    models: [
      "Prueba",
      "helloooo",
      {
        createIfNotExists: true,
      },
    ],
  },
  myDB: {
    createIfNotExists: true,
  },
};

/*
  Estructura:

  {
    defaultPoint: String, // para establecer la db desde el inicio
    defaultFileStorage: String, // para establecer una ruta por defecto de dónde crear o buscar bases de datos

    dbName: {
      location: {// la localización de la db en el manejador
        folders: {// si se localiza en un directorio
          name: String,// el nombre del directorio
          force: Boolean, // si quieres forzar a crear la carpeta ignorando los errores
        },
        files: Boolean, // si la base de datos está en los archivos sueltos
      },
      createIfNotExists: Boolean, // si quieres crear la db si no existe
      path: String, // la ruta del archivo
      strongType: Boolean, // si quieres que tenga type fuerte
      open: Boolean, // si quieres cerrar o no las transiciones a la base de datos
      models: Array, // el modelo que tendrá la base de datos
      forceLoad: Boolean, // si la base debe ser forzada a cargarse dentro del manejador aunque no se referencie
    }
  }
*/
