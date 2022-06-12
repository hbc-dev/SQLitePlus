module.exports = {
  defaultPoint: 'db',

  db: {
    createIfNotExists: true,
    types: false,
  }
}

/*
  Estructura:

  {
    defaultPoint: String/Name, // para establecer la db desde el inicio

    dbName: {
      createIfNotExists: Boolean, // si quieres crear la db si no existe
      types: Boolean, // si quieres que tenga type fuerte o debil
      open: Boolean, // si quieres cerrar o no las transiciones a la base de datos
      models: Array, // el modelo que tendrá la base de datos
      followModel: Boolean, // si quieres seguir los modelos o no
    }
  }
*/
