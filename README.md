# SQLite Plus 🍃
## Información
SQLite Plus es un manejador de bases de datos SQLite simple orientado a objetos, con el cuál puedes cargar archivos e incluso carpetas completas. Aún está en **fase BETA**, por lo cuál si ves algún tipo de error, puedes reportarlo 🍃

# Instalación
¡Use en su consola `npm i sqliteplus` y empiece ya mismo a programar!
También puedes hacer `npm i https://github.com/167BOT/sqliteplus.git` para descargarlo desde la página de Github del proyecto.

# Clase `DatabaseManager(Options, Folders/Paths)`
| Propiedades | Descripción |
| -- | -- |
| Options | Opciones para el manejo |
| Folders/Paths | Los archivos/carpetas a añadir |

| Options | Descripción | Default |
| -- | -- | -- |
| folder | Recibe un boleano. Añade varias bases de datos | `false`
| file | Recibe un boleano. Añade una única base de datos | `false`
| memory | Recibe un boleano. Añade una base de datos en memoria | `true`
| configPath | Recibe un string. Añade las configuraciones globales e individuales de tus bases de datos | `null`

```js
/*
> Folder
    - .sqlite
    - Users.sqlite
*/

const {DatabaseManager} = require('sqliteplus');
const db = new DatabaseManager({file: true}, 'db.sqlite')

console.log(db)// => Let see the output!
/*
DatabaseManager {
  data: null,
  folders: null,
  files: {
    db: Database {
      name: 'C:\\Users\\hugo\\Desktop\\npm modules\\SQLitePlus\\test\\db.sqlite',
      open: true,
      inTransaction: false,
      readonly: false,
      memory: false

    }
  },
  typesDB: { file: true }
}
*/
```

## Misceláneo
La clase incluye algunas funciones para poder manejar y crear tus bases de datos de forma práctica y sencilla.

### `addFiles(Files)`
Añade archivos a tu manejador de bases de datos de forma sencilla.

| Propiedades | Descripción |
| -- | -- |
| Files | La ruta de los archivos a añadir

```js
db.addFiles(`mydb.sqlite`, `sql.sqlite`)// => Succes!
```

### `addFolders(Folders)`
Añade carpetas enteras a tu manejador de bases de datos de forma sencilla.

| Propiedades | Descripción |
| -- | -- |
| Folders | La ruta de las carpetas a añadir


```js
db.addFolders(`allDbs`, `dataTest`)// => Succes!
```

### `createDB(Path, Name)`
Crea nuevos archivos de bases de datos de forma sencilla.

| Propiedades | Descripción |
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

### `createFolder(Options)`
Crea carpetas dentro del manejador e inclusive en tu proyecto. Fácil de usar.

|Propiedades | Descripción
| -- | --
| Options | Contiene las opciones de la función

| Propiedades | Descripción
| -- | --
| pathway | La ruta dónde quieres crear la carpeta dentro de tu proyecto
| name | El nombre de la carpeta tanto en tu proyecto como en el manejador
| force | Fuerza a crear la carpeta de cualquier manera. Ignora errores

```js
db.createFolder({pathway: __dirname, force: true})// => sucess!
db.createFolder({name: 'temporalFolder', force: true})// => sucess! only for manager

//Nota: Si no añades un nombre y tienes activo el force, se pondrá el nombre "databases" por defecto
```

### `removeFiles(Options)`
Elimina archivos del manejador de forma sencilla e individual. Tiene alcance también en carpetas.

|Propiedades | Descripción
| -- | --
| Options | Contiene las opciones de la función

| Propiedades | Descripción
| -- | --
| files | Las bases de datos a eliminar del manejador
| force | Fuerza a eliminar las bases de datos ignorando errores

```js
let removedFiles = db.removeFiles({files: ["mysecondDB", "fakeFile"], force: true})

/*
  {
    removedFiles: 1,
    totalFiles: 2,
    beforeRemoved: 1,
    filesInManager: 0
  }
*/
```

### `removeFolders(Options)`
Elimina carpetas del manejador de forma sencilla e individual.

|Propiedades | Descripción
| -- | --
| Options | Contiene las opciones de la función

| Propiedades | Descripción
| -- | --
| folders | Las carpetas a eliminar del manejador
| force | Fuerza a eliminar las carpetas del manejador. Ignora errores

```js
let removedFiles = db.removeFiles({folders: ["db", "dbs"], force: true})

/*
  {
    removedFolders: 1,
    totalFolders: 2,
    beforeRemoved: 1,
    foldersInManager: 0
  }
*/
```

### `moveFile(Options)`
Mueve un archivo hacia el directorio que quieras.

|Propiedades | Descripción
| -- | --
| Options | Contiene las opciones de la función

| Propiedades | Descripción
| -- | --
| file | El archivo que quieres mover
| to | El directorio donde lo quieres mover
| force | Fuerza a mover el archivo, ignora errores

```js
db.moveFile({file: 'db', to: 'folders/relacional', force: true});
```

### `moveContent(Options)`
Mueve un archivo hacia el directorio que quieras.

|Propiedades | Descripción
| -- | --
| Options | Contiene las opciones de la función

| Propiedades | Descripción
| -- | --
| files | El directorio de los archivos a mover
| to | El directorio donde los quieres mover
| exclude | Excluye algunas carpetas
| force | Fuerza a mover los archivos, ignora errores

```js
db.moveContent({file: 'folders/relacional', to: 'files', force: true});
```

# Funciones
SQLite Plus incluye funciones y "setters" básicos. Es posible usar de forma nativa `better-sqlite3` desde el módulo cosa que se desaconseja completamente.

```js
//SQLitePlus
let get = db.get([
  'Users',
  {
    id: 1,
    name: 'Juán'
  }
])

//better-sqlite3
db.files.db.prepare(`SELECT * FROM Users WHERE id=1, name=Juán`).run([1, 'Alberto'])
//o si ya tienes seteado una db
let myDB = db.db
myDB.prepare(`SELECT * FROM Users WHERE id=1, name=Juán`).run([1, 'Alberto'])
```

Se recomienda usar estas funciones unicamente cuando algo no haya sido incluido dentro del módulo.

## `src`
Escoge la base de datos sobre la que quieres actuar de forma sencilla e intuitiva.

| Propiedades | Descripción |
| -- | --
| src | La base de datos que quieres usar

```js
/*
  > apps
    > relacional
      - Communities.sqlite
      - Extra.sqlite
    - Users.sqlite
    - Models.js
    - index.js
*/

//index.js
const myManager = new DatabaseManager({
    file: true
  }, 'Users.sqlite')

myManager.addFolders('relacional')//añadimos la carpeta relacional
myManager.src = 'Users'//vamos a emplear la base de datos "Users"

//o podríamos emplear...

myManager.src = 'relacional/Communities'//... la base de datos "Communities" guardada en una carpeta
```

## `createTables(Models)`
Crea tablas dentro de una base de datos de forma rápida y automática

| Propiedades | Descripción
| -- | --
| Models | Los modelos de las bases de datos |

```js
//Models.js
module.exports = [
  [
    'Users', // tabla "Users" dentro de "Communities.sqlite"
    {
      id: undefined,
      name: undefined,
      roles: []
    }
  ],
  [
    'Roles',
    {
      id: undefined,
      name: undefined,
      membersCount: 0,
      membersIDs: []
    }
  ]
]

//index.js
const Models = require('./Models.js')
myManager.createTables(...Models)// => sucess!
```

## `close(Options)`
Cierra la base de datos. Contiene opciones extra de personalización y manejo.

|Propiedades | Descripción
| -- | --
| Options | Contiene las opciones de la función

| Propiedades | Descripción
| -- | --
| time | Un tiempo en el que estará cerrada. Tras pasar el tiempo, volverá a abrir
| db | Cierra una base de datos en específico

```js
myManager.close().then(x => console.log(x))// => Properly closed!

myManager.close({
  time: 10000,
  db: 'relacional/Communities'
}).then(x => console.log(x))// => Properly open!
```

## `Open(Options)`
Abre la base de datos. Contiene opciones extra de personalización y manejo.

|Propiedades | Descripción
| -- | --
| Options | Contiene las opciones de la función

| Propiedades | Descripción
| -- | --
| time | Un tiempo en el que estará abierta. Tras pasar el tiempo, volverá a cerrar
| db | Abre una base de datos en específico

```js
myManager.open().then(x => console.log(x))// => Properly open!'

myManager.open({
  time: 30000,
  db: 'relacional/Extra'
}).then().then(x => console.log(x))// => Properly closed!
```

