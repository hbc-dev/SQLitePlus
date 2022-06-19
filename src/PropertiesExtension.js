const Database = require('better-sqlite3-with-prebuilds');
const moduleErr = require('../utils/moduleErr');

class Extension extends Database {
    #path

    constructor(file) {
        super(file)

        this.inFolder = null;
        this.fileName = null;
        this.#path = null;
    }

    set Path(path) {
        this.#path = path;
    }

    getPath() { return this.#path }
}

module.exports = Extension;