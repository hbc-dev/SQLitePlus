const moduleErr = require("../../utils/moduleErr");

function checkKeys(object, reference) {
    let referenceKeys = Object.keys(reference);

    for (let key of Object.keys(object)) {
      let referenceDat = reference[key] ?? "null";
      let objectDat = object[key] ?? "null"

        if (!referenceKeys.includes(key)) throw new moduleErr(`La fila/propiedad "${key}" no existe`)
        if (
          typeof referenceDat !== typeof objectDat ||
          (Array.isArray(referenceDat) && !Array.isArray(objectDat)) ||
          (!Array.isArray(referenceDat) && Array.isArray(objectDat))
        )
          throw new moduleErr(`El tipo a insertar no coincide con el del modelo: ${key}`);

        if (referenceDat && objectDat && typeof objectDat === 'object') {
            Object.assign(objectDat, checkKeys(objectDat, referenceDat))
        };
    }

    return Object.assign({}, reference, object);
}

module.exports = checkKeys