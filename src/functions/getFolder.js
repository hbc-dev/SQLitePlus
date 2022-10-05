//gracias a AndreMor#1660
const {resolve, parse} = require("node:path");
const {lstatSync} = require("node:fs");

function getFolder(ruta) {
  try {
    
    let pathway = resolve(process.cwd(), ruta);
    const lstat = lstatSync(pathway);

    if (!lstat.isDirectory()) pathway = parse(pathway).dir;

    return pathway;

  } catch (err) { throw err; }
}

module.exports = getFolder;