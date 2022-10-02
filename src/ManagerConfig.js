const moduleErr = require("../utils/moduleErr");

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
        open = true,
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
        if (typeof open !== 'boolean') throw new moduleErr(
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
            open,
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
}

module.exports = ManagerConfig;
