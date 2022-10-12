const Database  = require('better-sqlite3-with-prebuilds');
// const moduleErr = require('../utils/moduleErr');

class Extension extends Database {
 
    #path
    #model
    #id

    constructor (file) {

        super(file);

        this.inFolder = null;
        this.fileName = null;
    };

    set Path(path) {

        this.#path = path;
    };

    set Model(model) {

        this.#model = model;
    };

    set Id(id) {

        this.#id = id;
    };

    getPath() {
        
        return this.#path
    };

    getModel() {

        return this.#model
    };

    getId() {

        return this.#id
    };
};

module.exports = Extension;
