type managerData = {
    /**Carga carpertas*/
    folder?: boolean = false;
    /**Carga archivos*/
    file?: boolean = false;
    /**Genera una base de datos en memoria*/
    memory?: boolean = true;
    /**El archivo de configuración*/
    configPath?: string;
}

type createFolderOptions = {
    /**La ruta dónde quieres crear la carpeta dentro de tu proyecto*/
    pathway: string = null;
    /**El nombre de la carpeta tanto en tu proyecto como en el manejador*/
    name: string = 'databases';
    /**Fuerza a crear la carpeta de cualquier manera. Ignora errores*/
    force: boolean = false;
}

type createDBOptions = {
    /**La ruta donde crear la base de datos*/
    pathway: string;
    /**El nombre de la base de datos*/
    name: string;
}

type createDBReturning = {
    /**El estado*/
    sucess: boolean;
    /**La ruta directa de la base de datos*/
    pathway: string;
}

type removeFilesOptions = {
    /**Las bases de datos a eliminar del manejador*/
    files: string[];
    /**Fuerza a eliminar las bases de datos ignorando errores*/
    force: boolean = false;
}

type removeFilesReturning = {
    /**El número de archivos removidos*/
    removedFiles: number;
    /**El número de archivos mandados a eliminar*/
    totalFiles: number;
    /**El número de archivos que habían en el manejador antes de la eliminación*/
    beforeRemoved: number;
    /**El total de archivos que quedan*/
    filesInManager: number;
}

type removeFoldersOptions = {
    /**Las carpetas a eliminar del manejador*/
    folders: string[];
    /**Fuerza a eliminar las carpetas del manejador. Ignora errores*/
    force: boolean = false;
}

type removeFoldersReturning = {
    /**El número de carpetas removidas*/
    removedFolders: number;
    /**El número de carpetas mandados a eliminar*/
    totalFolders: number;
    /**El número de carpetas que habían en el manejador antes de la eliminación*/
    beforeRemoved: number;
    /**El total de carpetas que quedan*/
    foldersInManager: number;
}

type moveFileOptions = {
    /**El archivo que quieres mover*/
    file: string;
    /**El directorio donde lo quieres mover*/
    to: string;
    /**Fuerza a mover el archivo, ignora errores*/
    force: boolean = false;
}

type moveContentOptions = {
    /**El directorio de los archivos a mover*/
    files: string;
    /**El directorio donde los quieres mover*/
    to: string
    /**Fuerza a mover los archivos, ignora errores*/
    force: boolean = false;
    /**Excluye algunos archivos*/
    exclude: string[] = [];
}

type openOptions = {
    /**El tiempo en el que estará abierta*/
    time: number;
    /**La base de datos específica sobre la que actuar*/
    db: string;
}

type closeOptions = {
    /**El tiempo en el que estará cerrada*/
    time: number;
    /**La base de datos específica sobre la que actuar*/
    db: string;
}

/**
 * @class Crea una instancia de un manejador
 * @example const manager = new DatabaseManager({file: true, configPath: './config.js'}, 'extraDb.sqlite');
 */
export = class DatabaseManager {
    /**
     * @class Crea una instancia de un manejador
     * @example const manager = new DatabaseManager({file: true, configPath: './config.js'}, 'extraDb.sqlite');
     */
    constructor(
        opts: managerData,
        ...path: string[]
    );

    /**
     * Añade archivos al manejador
     * @param files La lista de archivos a añadir
     */
    addFiles(...files: string[]): any;

    /**
     * Añade carpetas al manejador
     * @param folders La lista de carpetas a añadir
     */
    addFolders(...folders: string[]): any;
    
    /**
     * Crea una base de datos
     * @param options Las opciones de la función
     */
    createDB(options: createDBOptions): createDBReturning;

    /**
     * Crea una carpeta
     * @param options Las opciones de la función
     */
    createFolder(options: createFolderOptions): any;

    /**
     * Elimina archivos del manejador
     * @param options Las opciones de la función
     */
    removeFiles(options: removeFilesOptions): removeFilesReturning;

    /**
     * Elimina carpetas del manejador
     * @param options Las opciones de la función
     */
    removeFolders(options: removeFoldersOptions): removeFoldersReturning;

    /**
     * Mueve un archivo a una ruta del manejador específica
     * @param options Las opciones de la función
     */
    moveFile(options: moveFileOptions): any;

    /**
     * Mueve el contenido de una carpeta del manejador
     * @param options Las opciones de la función
     */
    moveContent(options: moveContentOptions): any;
    
    /**
     * Elige sobre que base de datos quieres actuar ahora
     * @param name La base de datos
     * @example <db>.src = 'test/db OR db OR :memory:'
     */
    set src(name: string)

    /**
     * Abre una base de datos
     * @param options Las opciones de la función
     */
    async open(options: openOptions): Promise<string>;

    /**
     * Cierra una base de datos
     * @param options Las opciones de la función
     */
    async close(options: closeOptions): Promise<string>;

    /**
     * Obtén datos de una tabla específica
     * @param object Los datos de la consulta
     * @example <db>.get(['Table', {row: 'myValue'}])
     */
    get(object: [string, object]): object

    /**
     * Obtén todos los datos de una tabla específica
     * @param table La tabla de la que obtener los datos
     * @example <db>.all('Table')
     */
    all(table: string): Array<object>

    /**
     * Crea tablas en una base de datos
     * @param object Las tablas
     * @example <db>.createTables(...[['Users', {id: null}]])
     */
    createTables(...object: Array<[string, object]>): any;

    /**
     * Inserta datos en una tabla específica
     * @param object Los datos a insertar
     * @example <db>.insert(['Table', {row: 'myValue'}])
     */
    insert(object: [string, object]): any;
}