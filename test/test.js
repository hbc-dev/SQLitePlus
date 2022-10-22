const {DatabaseManager} = require('../src/DatabaseManager'),
      Models = require('./models.js'),
      {test} = require('node:test')

const db = new DatabaseManager({ file: true, configPath: "./config.js" });

// for (let i = 0;i<1000;i++) db.insert([
//   "Accounts",
//   {
//     username: "167",
//     id: i,
//   },
// ]);

// return;

test('test all method', () => {
    for (let i = 0;i<1000;i++) db.all(["Accounts", {username: "167", id: 999}])
});

// test('test get method', () => {
//     for (let i=0;i<1000;i++) db.get([
//         "Accounts",
//         {username: "167"}
//     ])
// });