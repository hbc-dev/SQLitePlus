export type managerData = {
    folder?: boolean = false;
    file?: boolean = false;
    memory?: boolean = true;
    configPath?: string;
}

/**
 * @class Crea una instancia de un manejador
 * @example
 * ```js
 * const manager = new DatabaseManager({file: true, configPath: './config.js'}, 'extraDb.sqlite');
 * ```
 */
export class DatabaseManager {
    constructor(
        opts: managerData,
        ...path: string[]
    );

    /**
     * @function addFiles 
     * @param {string[]} path La lista de archivos a añadir
     */
    addFiles(...path: string[]): any;
}