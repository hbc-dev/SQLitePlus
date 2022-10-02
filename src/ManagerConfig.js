const moduleErr = require("../utils/moduleErr");
const reservateWords = [
    "defaultPoint",
    "defaultFileStorage"
]

class ManagerConfig {
    constructor({
        defaultConfig = null,
        defaultPoint = null,
        defaultFileStorage = null,
        databases = {}
    } = {}) {
        if (defaultConfig) {
            if (typeof defaultConfig !== 'string') throw new moduleErr(`La configuración por defecto debe ser un string`)
        }

        this.defaultPoint = defaultPoint;
        this.defaultFileStorage = defaultFileStorage;

        if (typeof databases !== 'object' || Array.isArray(databases))
            throw new moduleErr(`La propiedad "databases" debe de ser un objeto`)
        
        for (let db of Object.keys(databases)) {
            this.addDatabase(db, databases[db])
        }
    }

    addDatabase(name, {
        createIfNotExists = true,
        path = null,
        close = false,
        models = [],
        forceLoad = false
    } = {}) {
        if (typeof name !== 'string') throw new moduleErr(`El nombre de la base de datos debe ser un string`)

        if (typeof createIfNotExists !== 'boolean') throw new moduleErr(
            `La propiedad "createIfNotExists" debe ser un boolean`
        )
        if (path && typeof path !== 'string') throw new moduleErr(
            `La propiedad "path" debe ser un string`
        )
        if (typeof close !== 'boolean') throw new moduleErr(
            `La propiedad "open" debe ser un boolean`
        )
        if (!Array.isArray(models)) throw new moduleErr(
            `La propiedad "models debe ser un array`
        );
        if (typeof forceLoad !== "boolean") throw new moduleErr(
            `La propiedad "forceLoad" debe ser un boolean`
        );

        for (let model of models) {
            let table = model[0];
            let rows = model[1];

            if (typeof table !== 'string') throw new moduleErr(`El nombre de una tabla introducida no fue un string`)
            if (typeof rows !== 'object' || Array.isArray(rows)) throw new moduleErr(
                `El contenido de una tabla no fue un objeto como esperado`
            )
            if (Object.keys(rows).length < 1) throw new moduleErr(`Las filas de la tabla ${table} son nulas`)
        }

        this[name] = {
            createIfNotExists,
            path,
            close,
            models,
            forceLoad
        }
    }

    setDefaultPoint(option) {
        if (typeof option !== 'string' || option !== null) throw new moduleErr(`Se esperaba un boolean`)

        this.defaultPoint = option;
    }

    setDefaultFileStorage(option) {
        if (typeof option !== 'string' || option !== null) throw new moduleErr(`Se esperaba un boolean`)

        this.defaultPoint = option;
    }

    removeDatabase(name) {
        if (typeof name !== 'string') throw new moduleErr(`Se esperaba un string`)

        if (!this[name] || typeof this[name] !== 'object' || Array.isArray(this[name]))
            throw new moduleErr(`No se ha encontrado "${name}"`)

        delete this[name]
    }

    removeDatabases(...names) {
        for (let name of names) {
            this.removeDatabase(name)
        }
    }

    cloneDatabase({name, clone, force = false} = {}) {
        if (typeof name !== 'string') throw new moduleErr(`Se esperaba un string como "name"`)
        if (typeof clone !== 'string') throw new moduleErr(`Se esperaba un string como "clone"`);

        if (!this[clone] || typeof this[clone] !== 'object' || Array.isArray(this[clone]))
            throw new moduleErr(`No se ha encontrado el modelo a clonar "${clone}"`)

        if (reservateWords.includes(name)) throw new moduleErr(`Ese nombre es una palabra reservada`)
        if (!force && this[name]) throw new moduleErr(`"${name}" ya tiene una db asignada`)

        this[name] = this[clone]
    }

    editDatabase(name, edit) {
        if (typeof name !== 'string') throw new moduleErr(`Se esperaba un string como "name"`)
        if (typeof edit !== 'object' || Array.isArray(edit)) throw new moduleErr(`Se esperaba un object como "edit"`)

        if (!this[name] || typeof this[name] !== 'object' || Array.isArray(this[name])) throw new moduleErr(
            `No se ha encontrado "${name}"`
        )

        let edited = Object.assign(this[name], edit)
        delete this[name]

        this.addDatabase(name, edited);
    }
}

module.exports = ManagerConfig;
