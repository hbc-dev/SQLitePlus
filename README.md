# SQLite Plus 🍃
## Información
SQLite Plus es un manejador de bases de datos SQLite simple, con el cuál puedes cargar archivos e incluso carpetas completas. Aún está en **fase BETA**, por lo cuál si ves algún tipo de error, puedes reportarlo 🍃

# Instalación
¡Use en su consola `npm i sqliteplus` y empiece ya mismo a programar!
También puedes hacer `npm i https://github.com/167BOT/sqliteplus.git` para descargarlo desde la página de Github del proyecto.

# Sintaxis
Usa la misma sintaxis que SQLite, con la diferencia que puedes pasar los datos por objetos. Se explicará más adelante como hacerlo.

**Nota:** _El módulo tiene funciones asíncronas y síncronas. Todas las funciones `async/await` empiezan acaban por `Async`, por ejemplo `insertDataAsync(DB, Options, Data)` y las funciones `sync` simplemente así: `insertData(DB, Options, Data)`_

## Constructor
| Propiedades | |
| -- | -- |
| Options | Opciones para el manejo |
| Folders/Paths | Los archivos/carpetas a añadir |

| Options | |
| -- | -- |
| folder | Recibe un boleano. Si quieres CARGAR CARPERTAS el valor debe ser `true`. Por defecto es `false`
| file | Recibe un boleano. Si quieres CARGAR ARCHIVOS el valor debe ser `true`. Por defecto es `false`
| memory | Recibe un boleano. Si quieres AÑADIR UNA BASE DE DATOS EN MEMORIA el valor debe ser `true`. Por defecto es `false`

```js
/*
> Folder
    - .sqlite
    - db.sqlite
*/
const {Database} = require('sqliteplus');
const db = new Database({folder: true, memory: true}, 'folder')

console.log(db)// => Let see the output!
/*
Database {
  data: {
    memory: Database {},
    testData: { data0: Database {}, db: Database {} }
  },
  typesDB: { folder: true, memory: true }
}
*/
```

## insertData(DB, Options, Data)
Inserta datos de forma sencilla con objetos (uso de prefijo OBLIGATORIO) o con arreglos.
Filtra el donde vas a guardar los datos con las opciones de la función.

**NOTA**: _La función forma una sentencia base por defecto (`INSERT INTO tables`), no escriba la sentencia SQLite completa para evitar errores. Si quiere desactivarla, dale valor `false` a `autoCommand`._

| Propiedades | |
| -- | --
| DB | La base de datos sobre la que quieres actuar
| Options | Opciones varias para filtrar la insercción. Recibe un `Object`
| Data | Los datos a insertar. Recibe un `Object` o `Array`

| Options | |
| -- | --
| tableName | Recibe un `String`. Filtra las tablas a añadir datos
| rows | Recibe un `String`. Filtra las columnas a añadir datos
| objectPrefix | Recibe un `String`. Es el prefijo usado para buscar los datos por objetos
| command | Recibe un `String`. Es la sentencia de SQLite
| autoCommand | Recibe un `Boolean`. Tal cuál como una sentencia de SQLite simplificada, SQLite Plus crea una sentencia `INSERT INTO tables` automáticamente

```js
/*
    db => 1 - Tables: 'Users'  => Columns =>  id | name
*/

//async module
(async function() {
    //with arrays

    let save = await db.insertDataAsync(db.data.testData.db,
    {
    tableName: 'Users',
    autoCommand: true,
    rows: 'id, name'
    }, [1, 'Juán'])

    //with objects

    let save = await db.insertDataAsync(db.data.testData.db,
    {
    tableName: 'Users',
    autoCommand: true,
    rows: 'id, name'
    },
    {$id: 1, $name: 'Juán'});
});

    //sync module
    let save = db.insertData(db.data.testData.db,
    {
    tableName: 'Users',
    autoCommand: true,
    rows: 'id, name'
    },
    {$id: 1, $name: 'Juán'});

/*
    {sucess: true, new: ´{changes: 1, lastInsertRowid: 1}}
*/
```

## getData(DB, Options, Data)
Obtén datos de forma sencilla con varias formas de filtrar la información mediante las opciones de la función.
Puedes usar objetos (PREFIJO OBLIGATORIO) o con arreglos.

**NOTA:** _La función forma una sentencia base (`SELECT rows FROM tables`), no escriba la sentencia SQLite completa para evitar errores. Si quiere desactivarla, dale valor `false` a `autoCommand`_.

| Propiedades | |
| -- | --
| DB | La base de datos sobre la que quieres actuar
| Options | Opciones varias para filtrar la obtención. Recibe un `Object`
| Data | Los datos a obtener. Recibe un `Object` o `Array`

| Options | |
| -- | --
| type | Recibe un `String`. Busca entre todos las columnas o un dato específico. Los valores pueden ser `'all'` o `'one'`
| tableName | Recibe un `String`. Filtra las tablas a buscar
| rows | Recibe un `String`. Filtra las columnas a buscar
| objectPrefix | Recibe un `String`. Es el prefijo usado para buscar los datos por objetos
| command | Recibe un `String`. Es la sentencia de SQLite
| autoCommand | Recibe un `Boolean`. Tal cuál como una sentencia de SQLite simplificada, SQLite Plus crea una sentencia `SELECT rows FROM tables` automáticamente

```js
/*
    db => 1 - Tables: 'Users'  => Columns =>  id: 1, 2 | name: 'Juán', 'Nina'
*/

//async module
(async function() {
    //get one

    let get = await db.getDataAsync(db.data.testData.db,
    {
    type: 'one',
    tableName: 'Users',
    autoCommand: true,
    rows: 'id'
    }, [1])

    /*
    {id: 1, name: "Juán"}
    */

    //get all

    let get = await db.getDataAsync(db.data.testData.db,
    {
    type: 'all',
    tableName: 'Users',
    autoCommand: true
    }, [])
});

let get = await.db.getData(db.data.testData.db,
    {
    type: 'all',
    tableName: 'Users',
    autoCommand: true
    }, [])

/*
    [
    {id: 1, name: "Juán"},
    {id: 2, name: "Nina"}
    ]
*/
```

## updateData(DB, Options, Data)
Actualiza datos de forma sencilla con objetos (uso de prefijo OBLIGATORIO) o con arreglos.
Filtra el donde vas a actualizar los datos con las opciones de la función.

**NOTA**: _La función forma una sentencia base por defecto (`UPDATE tables SET`), no escriba la sentencia SQLite completa para evitar errores. Si quiere desactivarla, dale valor `false` a `autoCommand`._

| Propiedades | |
| -- | --
| DB | La base de datos sobre la que quieres actuar
| Options | Opciones varias para filtrar la actualización de datos. Recibe un `Object`
| Data | Los datos a actualizar. Recibe un `Object` o `Array`

| Options | |
| -- | --
| tableName | Recibe un `String`. Filtra las tablas a actualizar datos
| objectPrefix | Recibe un `String`. Es el prefijo usado para buscar los datos por objetos
| command | Recibe un `String`. Es la sentencia de SQLite
| autoCommand | Recibe un `Boolean`. Tal cuál como una sentencia de SQLite simplificada, SQLite Plus crea una sentencia `UPDATE tables SET` automáticamente

```js
/*
    db => 1 - Tables: 'Users'  => Columns =>  id: 1, 2 | name: 'Juán', 'Nina'
*/

//async module
(async function() {
    //with arrays

    let save = await db.updateDataAsync(db.data.testData.db,
    {
    tableName: 'Users',
    command: 'name=? WHERE name=?',
    autoCommand: true//no support for don't have to use command value :(
    }, ['Juán', 'Juanma'])

    //with objects

    let save = await db.updateDataAsync(db.data.testData.db,
    {
    tableName: 'Users',
    command: 'name=$newName WHERE name=$actualName',
    autoCommand: true,
    objectPrefix: '$'
    },
    {$newName: 'Juanma', $actualName: 'Juán'});
});

//sync module
    let save = await db.updateData(db.data.testData.db,
    {
    tableName: 'Users',
    command: 'name=$newName WHERE name=$actualName',
    autoCommand: true,
    objectPrefix: '$'
    },
    {$newName: 'Juanma', $actualName: 'Juán'});

/*
    {sucess: true, new: ´{changes: 0, lastInsertRowid: 1}}
*/
```
