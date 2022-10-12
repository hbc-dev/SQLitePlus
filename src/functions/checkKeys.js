const moduleErr = require('../../utils/moduleErr');

function checkKeys (

    object,
    reference
) {

    for (const key in object) {

        const referenceDat = reference[key] ?? 'null';

        let objectDat = object[key] ?? 'null';

        if (!(reference in key))

            throw new moduleErr(`La fila/propiedad "${key}" no existe`);

        if (

            Array.isArray(referenceDat)
         && Array.isArray(objectDat)
        )
            throw new moduleErr(`El tipo a insertar no coincide con el del modelo: ${key}`);

        if (
            
            referenceDat
         && typeof objectDat === 'object'
        )

            objectDat = { 

                ...objectDat,

                checkKeys(objectDat, referenceDat)
            };
    }

    return { reference, object };
}

module.exports = checkKeys;
