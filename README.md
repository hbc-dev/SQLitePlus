# SQLite Plus 🍃
## Información
SQLite Plus es un manejador de bases de datos SQLite simple orientado a objetos, con el cuál puedes cargar archivos e incluso carpetas completas. Aún está en **fase BETA**, por lo cuál si ves algún tipo de error, puedes reportarlo 🍃

# Instalación
¡Use en su consola `npm i sqliteplus` y empiece ya mismo a programar!
También puedes hacer `npm i https://github.com/167BOT/sqliteplus.git` para descargarlo desde la página de Github del proyecto.

# Clase `DatabaseManager(Options, Folders/Paths)`
Genera un manejador para poder administrar bases de datos SQLite.
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
    db: Database {
      name: '/home/hugo/Escritorio/modules/SQLitePlus/test/.sqlite',
      open: true,
      inTransaction: false,
      readonly: false,
      memory: false,
      inFolder: false,
      fileName: 'NONAME_test'
  },
  data: null,
  folders: null,
  files: {
    db: Database {
      name: '/home/hugo/Escritorio/modules/SQLitePlus/test/db.sqlite',
      open: true,
      inTransaction: false,
      readonly: false,
      memory: false,
      inFolder: false,
      fileName: 'db'
    }
  }
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
| exclude | Excluye algunos archivos
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

> Nota: hay ciertas palabras que están reservadas las cuales no pueden ser usadas. Esta es al lista de palabras reservadas:

| Palabra | Nombrar db | Explicación
| -- | -- | --
| defaultPoint | ❌ | Reservado para configuraciones
| defaultFileStorage | ❌ | Reservado para configuraciones
| defaultConfig | ❌ | Reservado para configuraciones
| exclude | ❌ | Reservado para configuraciones
| NONAME_ | ⚠ | Reservado únicamente para cargar archivos sin nombre desde carpetas
| NONAME | ⚠ | Reservado únicamente para cargar archivos sin nombre sueltos

| Símbolo | Significado 
| -- | --
| ✅ | Se puede usar |
| ❌ | No se puede usar |
| ⚠ | Parcial |

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

## `createTables(...Models)`
Crea tablas dentro de una base de datos de forma rápida y automática

| Propiedades | Descripción
| -- | --
| Models (rest) | Los modelos de las bases de datos |

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

## `get(object)`
Obtén datos específicos de la base de datos.

| Propiedades | Descripción
| -- | --
| object* | Un array con la query completa

> object*: recibe como primer parámetro un string con el nombre de la tabla sobre la cuál se va a buscar y como segundo parámetro un objeto con la query.

```js
db.get([
  "Users",
  {
    id: 123,
    name: '167',
  }
]);// => sucess!

/*
{
  id: 123,
  name: '167',
  roles: ["rol1", "rol2"]
}
*/
```

## `insert(object)`
Inserta datos en la base de datos.

| Propiedades | Descripción
| -- | --
| object* | Un array con la query completa

> object*: recibe como primer parámetro un string con el nombre de la tabla sobre la cuál se va a actuar y como segundo parámetro un objeto con la query. El segundo dato puede estar vacio mediante `null` y se insertarán los datos por defectos establecidos.

```js
db.insert([
  "Users",
  {
    id: 600,
    name: 'A name',
  }
]);// => sucess!
``` 

## `update(object)`
Actualiza datos en la base de datos.

| Propiedades | Descripción
| -- | --
| object* | Un array con la query completa

> object*: recibe como primer parámetro un string con el nombre de la tabla sobre la cuál se va a actuar, como segundo parámetro un objeto con el filtro y como último parámetro los nuevos datos. El tercer dato puede estar vacio mediante `null` y se insertarán los datos por defectos establecidos.

```js
db.update([
  "Users",
  {
    id: 600,
  },
  {
    name: "Godofredo"
  }
]);// => sucess!
```

## `delete(object)`
Elimina datos en la base de datos.

| Propiedades | Descripción
| -- | --
| object* | Un array con la query completa

> object*: recibe como primer parámetro un string con el nombre de la tabla sobre la cuál se va a actuar y como segundo parámetro un objeto con la query. El segundo dato puede estar vacio mediante `null` y se eliminarán los datos por defecto establecidos.

```js
db.delete([
  "Users",
  {
    name: 'Godofredo',
    id: 600,
  }
]);// => sucess!
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

## `open(Options)`
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

# Clase `ManagerConfig(Options)`
Genera una configuración para cargarla en el arranque.
| Propiedades | Descripción
| - | -
| Options | Las opciones de la configuración

| Options | Descripción
| -- | --
| defaultPoint | Es el punto por defecto donde el manejador mirará para setear una base de datos sobre la que actuar
| defaultFileStorage | Es el punto por defecto donde el manejador mirará donde se encuentra x base de datos si no es especificado su dirección
| databases | Los modelos de las bases de datos

```js
const {ManagerConfig} = require('sqliteplus');

const manager = new ManagerConfig({
  defaultPoint: 'test/db OR db OR :memory:',
  defaultFileStorage: __dirname,
  databases: {
    db: Options
  }
});
```

# Funciones
La clase contiene funciones variadas y útiles para poder manejar tu configuración de la base de datos.

## `addDatabase(Name, Options)`
Genera el modelo de una base de datos.

| Propiedades | Descripción
| - | -
| Name | El nombre del modelo
| Options | Las opciones del modelo

| Options | Descripción
| - | -
| createIfNotExists | Crea la base de datos si no existe. También crea tablas si no existen
| path | La dirección donde se encuentra la base de datos en tu proyecto
| close | Añade la base de datos cerrada por defecto
| Models | Los modelos de la base de datos
| forceLoad | Obliga a añadir la base de datos como pueda

| Models | Descripción
| - | -
`[Name, Model, ModelOptions][]` | La estructura del modelo

| ModelOptions | Descripción
| - | -
| createIfNotExists | Crea la tabla si no existe

```js
config.addDatabase("db", {
  forceLoad: true,
  models: [
    [
      "User",
      {
        name: null,
        id: null
      },
      {
        createIfNotExists: true
      }
    ]
  ]
});
```

## `cloneDatabase(Options)`
Clona un modelo con un nombre diferente.
| Propiedades | Descripción
| - | -
| Options | Las opciones del modelo

| Options | Descripción
| - | -
| name | El nombre del clon
| clone | El nombre del modelo a clonar
| force | Fuerza a clonar el modelo

```js
config.clone({name: 'otherDB', clone: 'db'});
```

## `editDatabase(Name, Options)`
Edita un modelo con un nombre.

Clona un modelo con un nombre diferente.

| Propiedades | Descripción
| - | -
| Name | El nombre del modelo a editar
| Options | Las opciones del modelo

| Options | Descripción
| - | -
| createIfNotExists | Crea la base de datos si no existe. También crea tablas si no existen
| path | La dirección donde se encuentra la base de datos en tu proyecto
| close | Añade la base de datos cerrada por defecto
| Models | Los modelos de la base de datos
| forceLoad | Obliga a añadir la base de datos como pueda

| Models | Descripción
| - | -
`[Name, Model, ModelOptions][]` | La estructura del modelo

| ModelOptions | Descripción
| - | -
| createIfNotExists | Crea la tabla si no existe

```js
config.editDatabase('otherDB', {
  forceLoad: false,
  createIfNotExists: true,
});
```

## `removeDatabase(Name)`
Elimina modelos de la configuración

| Propiedades | Descripción
| - | -
| Name | El nombre del modelo a eliminar

```js
config.removeDatabase('db');
```

## `removeDatabases(...Names)`
Elimina modelos de la configuración

| Propiedades | Descripción
| - | -
| Names | Los nombres de los modelos a eliminar

```js
config.removeDatabases('db', 'secondDB', 'etcDb');
```

## `setDefaultFileStorage(Path)`
Elige el punto de almacenamiento de bases de datos.

| Propiedades | Descripción
| - | -
| Path | La dirección de la carpeta

```js
config.setDefaultFileStorage(__dirname)
```

## `setDefaultPoint(Path)`
Elige la dirección de la base de datos sobre la que actuar principalmente en el arranque.

| Propiedades | Descripción
| - | -
| Path | La dirección en el manejador

```js
config.setDefaultPoint('db OR test/db OR :memory:')
```


