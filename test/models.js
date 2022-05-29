const Model = [
  [
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
    true]
]

/*

[
  'Tabla',
  {
    data: 'Pues esto es una fila y yo soy un valor por defecto'
  },
  {
    createIfNotExists: true,
    typeTable: true,
  }
]

*/
module.exports = Model;
