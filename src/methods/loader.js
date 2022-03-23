const path = require('path');
const fs = require('fs');

//methods
const methods = {async: {}, sync: {}}
const AsyncFunctions = fs.readdirSync(path.resolve(__dirname, './async')).forEach(file => methods.async[file.replace('.js', '')] = require(`../methods/async/${file}`))
const SyncFunctions = fs.readdirSync(path.resolve(__dirname, './sync')).forEach(file => methods.sync[file.replace('.js', '')] = require(`../methods/sync/${file}`))

module.exports = methods
