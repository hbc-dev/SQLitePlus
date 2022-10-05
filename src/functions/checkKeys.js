function checkKeys(object, reference) {
    let referenceKeys = Object.keys(reference);

    for (let key of Object.keys(object)) {
        if (!referenceKeys.includes(key)) delete object[key];

        if (typeof object[key] === 'object') {
            Object.assign(object[key], checkKeys(object[key], reference[key]))
        };
    }

    return Object.assign(reference, object);
}

module.exports = checkKeys