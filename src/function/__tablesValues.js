function __tablesValues(rows, types) {
  let result = ''

  rows.forEach((row, i) => {
      result = result+','+row+' '+types[i]
  });

  return result.replace(/^,/gm, '')
}

module.exports = __tablesValues
