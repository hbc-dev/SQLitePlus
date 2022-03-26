# SQLite Plus 🍃
## Información
SQLite Plus es un manejador de bases de datos SQLite simple, con el cuál puedes cargar archivos e incluso carpetas completas. Aún está en **fase BETA**, por lo cuál si ves algún tipo de error, puedes reportarlo 🍃

# Instalación
¡Use en su consola `npm i sqliteplus` y empiece ya mismo a programar!
También puedes hacer `npm i https://github.com/167BOT/sqliteplus.git` para descargarlo desde la página de Github del proyecto.

# Sintaxis
Usa la misma sintaxis que SQLite, con la diferencia que puedes pasar los datos por objetos. Se explicará más adelante como hacerlo.

**Nota:** _El módulo tiene funciones asíncronas y síncronas. Todas las funciones `async/await` empiezan acaban por `Async`, por ejemplo `insertDataAsync(DB, Options, Data)` y las funciones `sync` simplemente así: `insertData(DB, Options, Data)`_

# Clase `DatabaseManager(Options, Folders/Paths)`
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
const {DatabaseManager} = require('sqliteplus');
const db = new DatabaseManager({folder: true, memory: true}, 'testData')

console.log(db)// => Let see the output!
/*
Database {
  data: {
    memory: Database {},
    folders: {testData: { data0: Database {}, db: Database {} }}
  },
  typesDB: { folder: true, memory: true }
}
*/
```

## Funciones del constructor
La clase incluye algunas funciones para poder manejar tus bases de datos de forma práctica y sencilla.

### `addFiles(Files)`
Añade archivos a tu manejador de bases de datos de forma sencilla.
| Propiedades | |
| -- | -- |
| Files | La ruta de los archivos a añadir

```js
db.addFiles(`mydb.sqlite`, `sql.sqlite`)// => Succes!
```

### `addFolders(Folders)`
Añade carpetas enteras a tu manejador de bases de datos de forma sencilla.
| Propiedades | |
| -- | -- |
| Folders | La ruta de las carpetas a añadir
```js
db.addFolders(`allDbs`, `dataTest`)// => Succes!
```

### `createDB(Path, Name)`
Crea nuevos archivos de bases de datos de forma sencilla.
| Propiedades | |
| -- | -- |
| Path | La ruta donde quieres guardar el archivo
| Name | El nombre con el que quieres llamar al archivo

```js
db.createDB(__dirname, 'mysecondDB')// => Succes!

/*
    {
        sucess: true,
        path: C:\\Users\\xxx\\Desktop\\myProject\\database\\mysencondDB.sqlite
    }
*/
```

# Funciones
SQLite Plus incluye funciones básicas e intuitivas separadas de la clase `DatabaseManager()`. Aunque se recomienda el uso de estas funciones, es posible usar `better-sqlite3` (el módulo con el que funciona este Database Manager). Aquí se deja un ejemplo de como usar las funciones de `better-sqlite` de forma ajena:

```js
//with the module functions
let save = insertData(db.data.folders.testData.db, {
autoCommand: true,
rows: 'id, name',
tableName: 'Users'
}, [1, 'Alberto'])

//with the better-sqlite3 module
db.data.folders.testData.db.prepare(`INSERT INTO Users(id, name) VALUES(?, ?)`).run([1, 'Alberto'])
```

Se recomienda usar estas funciones unicamente cuando algo no haya sido incluido dentro del módulo.

## `createTable(DB, tableName, Rows, TypeData, Options)`
Crea tablas de forma sencilla en una base de datos.

| Propiedades | |
| -- | --
DB | La base de datos sobre la que quieres actuar
tableName | El nombre de la tabla que quieres crear. Recibe un `String`
Rows | El nombre de las columnas a crear. Recibe un `Array`
TypeData | El tipo de datos de las columnas. Dentro, puedes colocar el como quieres que se comporten con (por ejemplo) los valores `DEFAULT x` o `NOT NULL`, mira el ejemplo. Recibe un `Array`
Options | Las opciones de creación de tablas. Recibe un `Object`

| Options | |
| -- | -- |
ifnotexists | Crea la tabla SOLO cuando no haya sido creada. Por defecto es `true` y recibe un `Boolean`

```js
//async module
(async function() {
let newTable = await createTableAsync(db.data.testData.db, 'Emojis', ['id', 'name'], [
'INTEGER NOT NULL',
'TEXT DEFAULT myEmoji'
])
})();

//sync module
let newTable = createTable(db.data.testData.db, 'Guilds', ['id', 'name'], [
'INTEGER NOT NULL',
'TEXT DEFAULT myGuild'
])

/*
    {sucess: true, new: {changes: 0, lastInsertRowid: 1}}
*/
```

## `insertData(DB, Options, Data)`
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

    let save = await insertDataAsync(db.data.testData.db,
    {
    tableName: 'Users',
    autoCommand: true,
    rows: 'id, name'
    }, [1, 'Juán'])

    //with objects

    let save = await insertDataAsync(db.data.testData.db,
    {
    tableName: 'Users',
    autoCommand: true,
    rows: 'id, name'
    },
    {$id: 1, $name: 'Juán'});
})();

    //sync module
    let save = insertData(db.data.testData.db,
    {
    tableName: 'Users',
    autoCommand: true,
    rows: 'id, name'
    },
    {$id: 1, $name: 'Juán'});

/*
    {sucess: true, new: {changes: 1, lastInsertRowid: 1}}
*/
```

## `getData(DB, Options, Data)`
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

    let get = await getDataAsync(db.data.testData.db,
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

    let get = await getDataAsync(db.data.testData.db,
    {
    type: 'all',
    tableName: 'Users',
    autoCommand: true
    }, [])
})();

let get = await getData(db.data.testData.db,
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

## `updateData(DB, Options, Data)`
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

    let save = await updateDataAsync(db.data.testData.db,
    {
    tableName: 'Users',
    command: 'name=? WHERE name=?',
    autoCommand: true//no support for don't have to use command value :(
    }, ['Juán', 'Juanma'])

    //with objects

    let save = await updateDataAsync(db.data.testData.db,
    {
    tableName: 'Users',
    command: 'name=$newName WHERE name=$actualName',
    autoCommand: true,
    objectPrefix: '$'
    },
    {$newName: 'Juanma', $actualName: 'Juán'});
})();

//sync module
    let save = await updateData(db.data.testData.db,
    {
    tableName: 'Users',
    command: 'name=$newName WHERE name=$actualName',
    autoCommand: true,
    objectPrefix: '$'
    },
    {$newName: 'Juanma', $actualName: 'Juán'});

/*
    {sucess: true, new: {changes: 0, lastInsertRowid: 1}}
*/
```
