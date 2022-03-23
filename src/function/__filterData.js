const moduleErr = require('../../utils/moduleErr.js')

function __filterData(data, type, command, prefix) {
  if (Array.isArray(data)) return {data: data, command: command}

  else if (typeof data == 'object') {
    if (prefix == '') throw new moduleErr('El prefix no puede ser nulo')
    let values = []
    let regex = new RegExp(`^[${prefix}]`, 'gm')

    for (let key of Object.keys(data)) {
      let searchRegExp;

      if (prefix == '$') searchRegExp = new RegExp(`^${'\\'[0]+key.substring(0, prefix.length)}`, 'gm')
      else searchRegExp = new RegExp(`^${key.substring(0, prefix.length)}`, 'gm')

      searchRegExp = key.match(searchRegExp)

      if (searchRegExp[0] !== prefix) throw new moduleErr(`Se ha encontrado un valor (${key}) con un prefix diferente, respeta la sintaxis.`)
        values.push(data[key])//push in an array the data

      if (type == 'insert') {
          key = command.match(/VALUES\((.)+\)/gm)[0].replace(key, '?')//values
          command = command.replace(command.match(/VALUES\((.)+\)/gm)[0], key)//command
      } else if (type == 'update' || type == 'get') {
        let bar = '\\'[0]

          if (key[0] == '$') regex = new RegExp(`(=${bar+key})`, 'gm')
          else regex = new RegExp(`(=${key})`, 'gm')

          command = command.replace(command.match(regex), '=?')
      }
    }

    return {data: values, command: command}
  } else throw new moduleErr('Los datos solo pueden ser o un array o un objeto. Respeta la sintaxis')
}

module.exports = __filterData;
