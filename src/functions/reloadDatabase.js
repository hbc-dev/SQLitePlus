const moduleErr = require("../../utils/moduleErr");
const Database = require('../PropertiesExtension.js')

function reloadDatabase(db) {
    if (!db || typeof db !== "object") throw new moduleErr('Añade una base de datos válida')
    let path = db.getPath(),
        inFolder = db.inFolder,
        name = db.fileName

    db = new Database(path)
    db.inFolder = inFolder
    db.Path = path
    db.fileName = name

    return db
}

module.exports = reloadDatabase;