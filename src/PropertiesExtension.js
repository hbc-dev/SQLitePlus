const Database = require('better-sqlite3-with-prebuilds');
const moduleErr = require('../utils/moduleErr');

class Extension extends Database {
    #path
    #model

    constructor(file) {
        super(file)

        this.inFolder = null;
        this.fileName = null;
        this.#path = null;
    }

    set Path(path) {
        this.#path = path;
    }

    set Model(model) {
        this.#model = model;
    }

    getPath() { return this.#path }

    getModel() { return this.#model }
}

module.exports = Extension;