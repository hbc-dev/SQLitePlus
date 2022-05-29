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
SQLite Plus incluye funciones y "setters" básicos `DatabaseManager()`. Es posible usar de forma nativa `better-sqlite3` desde el módulo cosa que se desaconseja completamente.

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
