function searcher(name, files, folders) {
  let folder = name.match(/[^\/]+/),
      db = name.match(/[^\/]+$/)

  if (folder && name.split('').includes('/')) {
    folder = folders[folder]

    if (!folder) throw new Error('No existe XD')

    db = folder[db]

    if (!db) throw new Error('No existe XDDD')

    return db
  } else {
    db = files[db]

    if (!db) throw new Error('No existe XDDDDDDDD')

    return db
  }
}

let myFolders = {
  files: {
    db: 'Database',
    file: 'DB'
  },
  folders: {
    file: {
      db: 'HOLA'
    },
    folder: {
      HOLA: 'db'
    }
  }
}

console.time()
console.log(searcher('file/db', myFolders.files, myFolders.folders))
console.timeEnd()
