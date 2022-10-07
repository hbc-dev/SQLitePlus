const {resolve, sep} = require('node:path')
const {mkdirSync, readdirSync, writeFile} = require('node:fs');
const loader = require('./functions/loader.js')
const searcher = require('./functions/searcher')
const moduleErr = require('../utils/moduleErr.js')
const Stament = require('./Stament.js')
const searchConfig = require('./functions/config.js')
const reloadDatabase = require('./functions/reloadDatabase.js');
const checkKeys = require('./functions/checkKeys.js')
const ManagerConfig = require('./ManagerConfig')

class DatabaseManager {
  //private
  #configData;

  constructor(opts = { folder: false, file: false, memory: true }, ...path) {
    this.#configData = !opts.configPath ? false : searchConfig(opts.configPath);

    let config = this.#configData;
    const loaded = loader(opts, path, config, this); //Load db files. Default collecting files

    this.data = loaded.memory ?? null;
    this.folders = loaded.folders ?? {};
    this.files = loaded.files ?? {};

    if (config.defaultPoint) this.src = config.defaultPoint;
    else this.db = null;
  }

  addFiles(...files) {
    let newFiles = loader({ file: true }, files)?.files;

    if (!this.files) this.files = {};
    this.files = Object.assign(this.files, newFiles);
  }

  addFolders(...folders) {
    let newFolders = loader({ folder: true }, folders)?.folders;

    if (!this.folders) this.folders = {};
    this.folders = Object.assign(this.folders, newFolders);
  }

  createFolder({ pathway = null, name = null, force = false } = {}) {
    if (!name && !force)
      throw new Error("No se ha especificado el nombre de la carpeta");

    if (!this.folders) this.folders = {};

    name = name ? name : force ? "databases" : null;

    let loadedFolders = this.folders;
    if (loadedFolders[name] && !force)
      throw new moduleErr(
        `Ya hay cargado una carpeta llamada ${name}. Usa la propiedad "force" para forzar la creación`
      );
    else loadedFolders[name] = {};

    if (pathway) {
      try {
        mkdirSync(resolve(pathway, name));
      } catch (err) {
        if (force) return;
      }
    }
  }

  removeFiles({ files = null, force = false } = {}) {
    if (!files)
      throw new moduleErr(
        `Añade los archivos a borrar del manejador. Tienen que estar dentro de un Array`
      );
    if (!Array.isArray(files))
      throw new moduleErr(`Los archivos deben de estar dentro de un Array`);

    let filesInManager = this.files,
      foldersInManager = this.folders,
      actualDb = this.db,
      removedFiles = 0,
      totalFiles = files.length,
      beforeRemoved = Object.keys(filesInManager).length;

    for (let file of files) {
      if (typeof file !== "string" && !force)
        throw new moduleErr(`Se ha incluido algo que no es un archivo`);

      try {
        let searched = searcher(file, foldersInManager, filesInManager);
        if (!filesInManager[file] && !searched.inFolder && !force)
          throw new moduleErr(
            `No se ha encontrado la base de datos ${file} dentro del manejador`
          );

        if (searched) removedFiles++;
        if (actualDb.getId() == searched.getId()) this.db = null;

        if (searched.inFolder)
          delete foldersInManager[searched.inFolder][searched.fileName];
        else delete filesInManager[file];
      } catch (err) {
        if (force) continue;
        else throw new moduleErr(err.message);
      }
    }

    return ({} = {
      removedFiles,
      totalFiles,
      beforeRemoved,
      filesInManager: Object.keys(filesInManager).length,
    });
  }

  removeFolders({ folders = null, force = false } = {}) {
    if (!folders)
      throw new moduleErr(
        `Debes de añadir las carpetas. Añádelas dentro de un Array`
      );
    if (!Array.isArray(folders))
      throw new moduleErr(`Debes de añadir las carpetas dentro de un Array`);

    let foldersInManager = this.folders,
      actualDb = this.db,
      removedFolders = 0,
      totalFolders = folders.length,
      beforeRemoved = Object.keys(foldersInManager).length;

    for (let folder of folders) {
      if (typeof folder !== "string" && !force)
        throw new moduleErr(`Se ha includo algo que no es una carpeta`);
      if (!foldersInManager[folder] && !force)
        throw new moduleErr(
          `No se ha encontrado la carpeta ${folder} dentro del manejador`
        );

      try {
        if (foldersInManager[folder]) removedFolders++;
        if (
          actualDb?.inFolder &&
          actualDb.getId() ==
            foldersInManager[actualDb.inFolder][actualDb.fileName].getId()
        )
          this.db = null;

        delete foldersInManager[folder];
      } catch (err) {
        if (force) continue;
        else throw new moduleErr(err.message);
      }
    }

    return ({} = {
      removedFolders,
      totalFolders,
      beforeRemoved,
      foldersInManager: Object.keys(foldersInManager).length,
    });
  }

  moveFile({ file = null, to = null, force = false } = {}) {
    if (!this.folders) this.folders = {};
    if (!this.files) this.files = {};

    if (!file || !to)
      throw new moduleErr(
        `Faltan datos. Añade el archivo en el manejador y elige una ruta dentro del mismo`
      );
    if (typeof file !== "string" || typeof to !== "string")
      throw new moduleErr(`Has introducido valores que no son de tipo String`);

    let folderName = to.match(/(?<=\/).+/)?.[0];
    let searched = searcher(file, this.folders, this.files),
      isFolder = (folderName && to.split("").includes("/")) ?? false;

    if (isFolder && to.match(/[^\/]+/)[0] !== "folders" && !force)
      throw new moduleErr(
        `La sintaxis correcta para mover ${file} a carpetas es "folders/myFolder"`
      );

    if (!isFolder && to !== "files" && !force)
      throw new moduleErr(
        `La sintaxis correcta para mover ${file} a los archivos comunes es "files"`
      );

    if (!searched && !force)
      throw new moduleErr(`No se ha encontrado el archivo a mover a ${to}`);

    let exists = isFolder
      ? this.folders[folderName]?.[searched.fileName]
      : this.files[searched.fileName];
    if (!force && exists)
      throw new moduleErr(`Ya existe la base de datos en ${to}`);
    else if (force && exists) return;

    try {
      let folders = this.folders,
        files = this.files;

      if (isFolder) {
        let folder = folders[folderName];

        if (!folder && !force)
          throw new moduleErr(
            `La ruta ${folderName} no se encuentra en el manejador`
          );
        else if (force && !folder) {
          this.createFolder({ name: folderName, force: true });

          folder = folders[folderName];
        }

        folder[searched.fileName] = searched;
      } else {
        files[searched.fileName] = searched;
      }

      if (searched.inFolder) {
        delete folders[searched.inFolder][searched.fileName];
      } else delete files[searched.fileName];

      if (isFolder)
        folders[folderName][searched.fileName].inFolder = folderName;
      else files[searched.fileName].inFolder = false;
    } catch (error) {
      if (force) return;
      else throw new moduleErr(error.message);
    }
  }

  moveContent({ files = null, to = null, force = null, exclude = [] } = {}) {
    if (!this.folders) this.folders = {};
    if (!this.files) this.files = {};

    if (!files || !to)
      throw new moduleErr(
        `Faltan datos. Añade el archivo en el manejador y elige una ruta dentro del mismo`
      );
    if (typeof files !== "string" || typeof to !== "string")
      throw new moduleErr(`Has introducido valores que no son de tipo String`);
    
    if (!Array.isArray(exclude)) throw new moduleErr(`Los archivos excluídos van en un array`);

    let folderName = {
      to: to.match(/(?<=\/).+/)?.[0] ?? 'files',
      files: files.match(/(?<=\/).+/)?.[0] ?? 'files'
    };

    let searched = {
      to: to == "files" ? this.files : this.folders[folderName.to],
      files: files == "files" ? this.files : this.folders[folderName.files],
    };

    let isFolder = {
        to: (folderName.to !== 'files' && to.split("").includes("/")) ?? false,
        files: (folderName.files !== 'files' && files.split("").includes("/")) ?? false
    }
    
    if (isFolder.files && files.match(/[^\/]+/)[0] !== "folders" && !force)
      throw new moduleErr(
        `La sintaxis correcta para mover el contenido a carpetas es "folders/myFolder"`
      );

    if (isFolder.to && to.match(/[^\/]+/)[0] !== 'folders' && !force) throw new moduleErr(
      `La sintaxis correcta para mover el contenido de ${files} a carpetas es "folders/myFolder"`
    );
    
    if (!isFolder.to && to !== 'files' && !force) throw new moduleErr(
      `La sintaxis correcta para mover el contenido a los archivos comunes es "files"`
    );

    if (!isFolder.files && files !== "files" && !force) throw new moduleErr(
      `La sintaxis correcta para mover el contenido de a los archivos comunes es "files"`
    );

    if (!searched.to && !force)
      throw new moduleErr(`El directorio ${to} no existe`);
    else if (force && !searched.to && isFolder.to) this.createFolder({name: folderName.to, force});

    if (!searched.files && !force)
      throw new moduleErr(`El directorio ${files} no existe`);
    else if (force && !searched.files && isFolder.files) this.createFolder({name: folderName.files, force});

    if (files == to && !force) throw new moduleErr(
      `No puedes mover el contenido a la misma carpeta de destino`
    ); else if (files == to && force) return;
    
    to = this.folders[folderName.to] ?? this.files;
    files = this.folders[folderName.files] ?? this.files

    for (let db of Object.values(files)) {
      if (exclude.includes(db.fileName)) continue;
      else db.inFolder = isFolder.to ? folderName.to : false;

      to[db.fileName] = db;
      delete files[db.fileName];
    }
  }

  createDB({ pathway, name } = {}) {
    if (!pathway)
      throw new moduleErr("Añade la ruta donde crear una nueva base de datos");
    if (!name) name = "";
    pathway = resolve(pathway);

    try {
      readdirSync(pathway);
    } catch (e) {
      throw new moduleErr(
        `A ocurrido un error. El error más común es una ruta mal puesta, más información:\n${e.message}`
      );
    }

    writeFile(
      pathway + sep + (!name.endsWith(".sqlite") ? name + ".sqlite" : name),
      "",
      function (err) {
        if (err)
          throw new moduleErr(
            `A ocurrido un error, más información:\n${err.message}`
          );
      }
    );

    return {
      sucess: true,
      pathway: resolve(pathway + sep + (!name.endsWith(".sqlite") ? name + ".sqlite" : name)),
    };
  }

  //BASE DE DATOS
  set src(name) {
    if (!name)
      throw new moduleErr("Añade el nombre de la base de datos a usar");
    if (typeof name !== "string")
      throw new moduleErr("La ruta debe de ser un string");

    const searched = searcher(name, this.folders, this.files);
    if (typeof searched == 'string' && searched.toLowerCase() == ":memory:") {
      if (!this.data) throw new moduleErr("No hay ninguna base de datos en memoria");

      this.db = this.data;
      return;
    } else this.db = searched;
  }

  async close({ time = null, db = null } = {}) {
    return new Promise((res) => {
      db = db ? searcher(db, this.folders, this.files) : this.db;
      if (!db)
        throw new moduleErr("No hay ninguna base de datos elegida para cerrar");
      if (!db.open) throw new moduleErr("La base de datos ya estaba cerrada");

      db.close();

      time = Number(time);
      if (time) {
        setTimeout(() => {
          db = reloadDatabase(db);

          if (db.inFolder) this.folders[db.inFolder][db.fileName] = db;
          else this.files[db.fileName] = db;

          this.db = db;
          return res("[SQLP]: Properly open!");
        }, time);
      } else res("[SQLP]: Properly closed!");
    });
  }

  async open({ time = null, db = null } = {}) {
    return new Promise((res) => {
      db = db ? searcher(db, this.folders, this.files) : this.db;
      if (!db)
        throw new moduleErr("No hay ninguna base de datos elegida para cerrar");

      if (db.open) throw new moduleErr("La base de datos ya estaba abierta");

      db = reloadDatabase(db);

      if (db.inFolder) this.folders[db.inFolder][db.fileName] = db;
      else this.files[db.fileName] = db;

      this.db = db;

      time = Number(time);
      if (time) {
        setTimeout(() => {
          db.close();

          res("[SQLP]: Properly closed!");
        }, time);
      } else res("[SQLP]: Properly open!");
    });
  }

  get(object) {
    let db = this.db;
    const myStament = new Stament(object);
    let stament = myStament.create("GET_DATA");

    if (!db)
      throw new moduleErr(
        'Añade una base de datos sobre la que actuar con "db.src = dbName"'
      );
    let myData = myStament.parseDB(db.prepare(stament.stament).all());

    let raw = [myData, object[1]];
    let rawToSimplify = [[], myStament.simplifyData(raw[1], []).simplify];
    let searched = [];

    for (let value of raw[0]) {
      value = myStament.simplifyData(value, [], {
        clearIDs: false,
        groups: true,
      }).simplify;

      for (let item of value.values()) {
        rawToSimplify[0].push(item);
      }
    }

    myStament.clearIDs();

    for (let value of rawToSimplify[1].values()) {
      searched = myStament.filter(value, rawToSimplify[0], searched);
      rawToSimplify[0] = searched.data;

      if (searched.data.length < 1) {
        searched = null;
        break;
      }
    }

    if (searched?.data.length > 0) {
      let object = {};

      if (searched.repeat) {
        let id = searched.data[0][2].id;
        searched = searched.data.filter((x) => x[2].id == id);
      } else searched = searched.data;

      for (let data of searched.filter((x) => x[2].values).values()) {
        object[data[0]] = data[2].values;
      }

      return object;
    } else return searched;
  }
  //debería de agregar un apartado de opciones

  all(table) {
    let db = this.db;
    const myStament = new Stament(table);
    let stament = myStament.create("GET_DATA");

    if (!db)
      throw new moduleErr(
        'Añade una base de datos sobre la que actuar con "db.src = dbName"'
      );
    let myData = db.prepare(stament.stament).all();

    return myStament.parseDB(myData);
  }

  createTables(...object) {
    let db = this.db;

    if (!db) throw new moduleErr("Añade una base de datos sobre la que actuar");
    if (object.length < 1)
      throw new moduleErr("Añade tablas para añadir a la base de datos");

    for (let item of object.values()) {
      if (!Array.isArray(item))
        throw new moduleErr("Las tablas se representan en Arrays");
      if (item.length < 2) throw new moduleErr("Datos de la tabla incompletos");

      const myStament = new Stament(item).create("NEW_TABLE");
      db.prepare(myStament).run();
    }
  }

  insert(object) {
    let db = this.db;

    if (!db) throw new moduleErr("Añade una base de datos sobre la que actuar");
    if (!Array.isArray(object)) throw new moduleErr(`Se esperaba un array`);
    if (object.length <= 1) throw new moduleErr("Faltan datos");

    let tableName = object[0];
    let data = object[1];
    let finalObject = {};

    if (typeof tableName !== "string")
      throw new moduleErr("Se esparaba como nombre de la table un string");

    if (!data || typeof data !== "object" || Array.isArray(data)) {
      if (!data || rows.length < 1) {
        data = db.prepare(`SELECT dflt_value, name FROM pragma_table_info('${tableName}')`).all();
        
        for (let {dflt_value, name} of data) {
          let defaultValue = JSON.parse(dflt_value.replace(/^'|'$/gm, "").replace(/\'\'/gm, "'"));

          finalObject[name] = defaultValue;
        }
      } else throw new moduleErr("Se esperaba como data un objecto");
    } else {// is object
      let rows = Object.keys(data);

      for (let row of rows) {
        let model = db.prepare(`SELECT dflt_value, name FROM pragma_table_info('${tableName}') WHERE name='${row}'`).get();
        if (!model) throw new moduleErr(`La fila "${row}" no existe`)

        let defaultValue = JSON.parse(model.dflt_value.replace(/\'/gm, ""));
        
        if (defaultValue && typeof defaultValue == 'object' && !Array.isArray(defaultValue)) {
          if (!data[row] || typeof data[row] !== 'object')
            throw new moduleErr(`Se ha intentado introducir ${typeof data[row]} o undefined/null en una fila de tipo object: ${row}`)
          
          finalObject[model.name] = checkKeys(data[row], defaultValue);
          continue;
        }

        if (data[row] && typeof data[row] == 'object' && typeof defaultValue !== 'object')
          throw new moduleErr(`Se ha intentado introducir un object en un tipo ${typeof defaultValue}: ${row}`)

        finalObject[model.name] = data[row]
      }
    }

    if (Object.keys(finalObject).length < 1)
      throw new moduleErr(`Los datos que se intentan insertar no coinciden con el modelo`)

    const stament = new Stament([tableName, finalObject])
    db.prepare(stament.create('ADD_DATA')).run();
  }

  update(object) {
    let db = this.db;

    if (!db) throw new moduleErr("Añade una base de datos sobre la que actuar");
    if (!Array.isArray(object)) throw new moduleErr(`Se esperaba un array`);
    if (object.length <= 1) throw new moduleErr("Faltan datos");

    let tableName = object[0];
    let filter = object[1];
    let update = object[2];
    let finalObject = {};

    if (typeof tableName !== "string")
      throw new moduleErr("Se esparaba como nombre de la table un string");

    if (typeof filter !== 'object' || Array.isArray(filter))
      throw new moduleErr(`Se esperaba como filter un objecto`)

    let getter = this.get([tableName, filter])
    if (!getter) throw new moduleErr(`No se han encontrado parámetros semejantes al filter`)

    if (!update || typeof update !== "object" || Array.isArray(update)) {
      if (!update || rows.length < 1) {
        update = db.prepare(`SELECT dflt_value, name FROM pragma_table_info('${tableName}')`).all();
        
        for (let {dflt_value, name} of update) {
          let defaultValue = JSON.parse(dflt_value.replace(/\'/gm, ""));

          finalObject[name] = defaultValue;
        }
      } else throw new moduleErr("Se esperaba como data un objecto");
    } else {
      let rows = Object.keys(update);

      for (let row of rows) {
        if (getter[row] && typeof getter[row] == 'object') {
          if (!update[row] || typeof update[row] !== 'object')
            throw new moduleErr(`Se ha intentado introducir ${typeof update[row]} o undefined/null en una fila de tipo object: ${row}`)
          
          finalObject[row] = checkKeys(update[row], getter[row]);
          continue;
        }

        if (update[row] && typeof update[row] == 'object' && typeof getter[row] !== 'object')
          throw new moduleErr(`Se ha intentado introducir un object en un tipo ${typeof getter}: ${row}`)

        finalObject[row] = update[row]
      }
    }

    if (Object.keys(finalObject).length < 1)
      throw new moduleErr(`No ha sido posible actualizar la fila porque no se han encontrado coincidencias`)

    const stament = new Stament([tableName, finalObject, getter]);
    db.prepare(stament.create("EDIT_DATA")).run();
  }

  delete(object) {
    let db = this.db;

    if (!db) throw new moduleErr("Añade una base de datos sobre la que actuar");
    if (!Array.isArray(object)) throw new moduleErr(`Se esperaba un array`);
    if (object.length <= 1) throw new moduleErr("Faltan datos");

    let tableName = object[0];
    let data = object[1];

    if (typeof tableName !== "string")
      throw new moduleErr("Se esparaba como nombre de la table un string");

    if (typeof data !== "object" || Array.isArray(data))
      throw new moduleErr(`Se esperaba como query un objecto`);

    let getter = this.get([tableName, data])
    if (!getter) throw new moduleErr(`No se han encontrado parámetros semejantes a la query`);

    const stament = new Stament([tableName, getter]);
    db.prepare(stament.create('DELETE_DATA')).run();
  }
}

module.exports = {DatabaseManager, ManagerConfig};
