interface databaseOptions {
  
    createIfNotExists: boolean = true,
    path: string;
    close: boolean = false;
    models: Array<[string, object, modelOptions]> = [];
    forceLoad: boolean = false;
}

interface modelOptions {
  
    createIfNotExists: boolean = true,
}

interface databasesKeyOptions {

    [key: string]: databaseOptions
}

interface ManagerConfigOptions {
 
    //defaultConfig: string;
    defaultPoint: string;
    defaultFileStorage: string;
    databases: databasesKeyOptions
}

interface cloneDatabaseOptions {
 
    name: string;
    clone: string;
    force: boolean = false;
}

export = class ManagerConfig {
 
    public defaultPoint: string;
    public defaultFileStorage: string;
    
    constructor(options: ManagerConfigOptions)

    /**
     * Elige el punto de acceso por defecto
     * @param option La dirección dentro del manejador
     */
    setDefaultPoint(option: string | null): any;

    /**
     * Elige el punto donde se buscarán los archivos por defecto
     * @param option El directorio donde buscar
     */
    setDefaultFileStorage(option: string | null): any;

    /**
     * Añade una nueva base de datos a los modelos
     * @param name El nombre de la base de datos
     * @param options Las opciones de la base de datos
     */
    addDatabase(name: string, options: databaseOptions): any;

    /**
     * Edita el modelo de una base de datos
     * @param name El nombre de la base de datos a editar
     * @param edit El object con las ediciones
     */
    editDatabase(name: string, edit: databaseOptions): any;

    /**
     * Clona un modelo
     * @param options Las opciones de la función
     */
    cloneDatabase(options: cloneDatabaseOptions): any;

    /**
     * Elimina un modelo
     * @param name El nombre del modelo
     */
    removeDatabase(name: string): any;

    /**
     * Elimina varios modelos
     * @param names Los nombres de los modelos
     */
    removeDatabases(...names: string[]): any;
}

