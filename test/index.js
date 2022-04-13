function simplifyData(data, principalData) {
  let rawData = []

  for (let key of Object.keys(data)) {
    let array = []

    array.push(key)

    if (Array.isArray(data[key])) array.push(data[key])
    else if (typeof data[key] == 'object') array.push('::Object::') && rawData.push([key, data[key], principalData.reduce((prev, current) => prev[2].position > current[2].position ? prev : current)[2].position+1])
    else array.push(data[key])

    if (principalData.length < 1) array.push({position: 0, in: false})
    else array.push({position: 0, in: false})

    principalData.push(array)
  }

  if (rawData.length > 0) {
    for (let i = 0;i<100;i++) {
      let myUnresolvedData = rawDataConvert(rawData)
      myUnresolvedData.resolved.forEach(item => principalData.push(item))

      rawData = myUnresolvedData.peding
      if (myUnresolvedData.peding.length < 1) break;
    }
  }

  return {simplify: principalData}
}

function rawDataConvert(raw) {
  let unResolved = [],
      resolvedRaw = []

  for (let item of raw.values()) {
    let keys = Object.keys(item[1])

    for (let key of keys) {
      let array = [],
          value = item[1][key]

      if (typeof value == 'object' && !Array.isArray(value)) unResolved.push([key, value, item[2]+1]) && resolvedRaw.push([key, '::Object::', {position: item[2], in: item[0]}])
      else resolvedRaw.push([key, item[1][key], {position: item[2], in: item[0]}])
    }
  }

  return {resolved: resolvedRaw, peding: unResolved}
}

console.log(simplifyData({myDATA: 0, hola: 2, sexo: 'xd', myName: {is: {yes: 'duro', jaja: {ultimate: ['pene']}}}}, []).simplify)
