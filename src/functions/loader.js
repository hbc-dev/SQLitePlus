const path = require('path')
const fs = require('fs')
const moduleErr = require('../../utils/moduleErr.js')
const Database = require('better-sqlite3-with-prebuilds')

function loader(options, paths, config) {
  const pathway = {}
  const loaded = {}

  paths.forEach((item, i) => {
    let name = item.replace('.sqlite', '').match(/\w+$/g)
    name = name ?? [`data${i}`]

    pathway[name[0]] = path.resolve(item)
    //get all the resolve paths
  });

  let keys = Object.keys(pathway)

  if (options?.memory) {
    loaded['memory'] = new Database(':memory:')
  }

  if (options?.file) {
    loaded['files'] = {}

    if (pathway.length < 1) throw new moduleErr('Añade archivos de SQLite')

    let array = []

          for (let x of keys) {
            try {
              fs.readFileSync(pathway[x])
            } catch(err) {
              if (config[x]?.createIfNotExists) fs.writeFileSync(pathway[x], '')
              else throw new moduleErr(`Ha habido un error al acceder a los archivos. Error completo:\n${err.message}`)
            }

            if (pathway[x].match(/.\w+$/g)[0] !== '.sqlite') throw new moduleErr(`Ha sido cargado un archivo que no es sqlite: ${pathway[x]}`)

            array.push({path: pathway[x], name: x})
          }

          array.forEach(file => {
              loaded.files[file.name] = new Database(file.path)
          });

          return loaded
  }

  else if (options?.folder) {
    loaded['folders'] = {}

    if (pathway.length < 1) throw new moduleErr('Añade carpetas')

      let dir;
      let array = []

    for (let x of keys) {
      try {
        dir = fs.readdirSync(pathway[x])
      } catch(err) {
        throw new moduleErr(`Ha habido un error al acceder a los archivos. Error completo:\n${err.message}`)
      }

      let folderPath = pathway[x]
      let folderName = pathway[x].match(/\w+$/g)

      if (dir.filter(x => x.match(/.\w+$/g) == '.sqlite').length < 1) throw new moduleErr(`No se ha encontrado ninguna base de datos en la carpeta`)
      array.push({files: dir.filter(y => y.match(/.\w+$/g) == '.sqlite'), path: folderPath, name: folderName})
    }

          array.forEach((object) => {
            let files = {}

            object.files.forEach((file, i) => {
              let fileName = file.replace('.sqlite', '')
              fileName = fileName == '' ? `data${i}` : fileName

                files[fileName] = new Database(object.path+'/'+file)
            });//set the path of folder files

              loaded.folders[object.name] = files
          });

          return loaded
    }

  return loaded
}

module.exports = loader;
