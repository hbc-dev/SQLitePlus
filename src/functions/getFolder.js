//gracias a AndreMor#1660
const path = require("path");
const fs = require("fs");

function getFolder(ruta) {
  try {
    
    let pathway = path.resolve(process.cwd(), ruta);
    const lstat = fs.lstatSync(pathway);

    if (!lstat.isDirectory()) pathway = path.parse(pathway).dir;

    return pathway;

  } catch (err) { throw err; }
}

module.exports = getFolder;