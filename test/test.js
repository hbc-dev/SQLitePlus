const {DatabaseManager} = require('../src/DatabaseManager'),
      Models = require('./models.js')

const db = new DatabaseManager({ file: true, configPath: "./config.js" });

// for (let i = 0;i<1000;i++) db.insert([
//   "Accounts",
//   {
//     username: "167",
//     id: i,
//   },
// ]);

// return;
console.log(db.all(["Accounts"]));

// test('test get method', () => {
//     for (let i=0;i<1000;i++) db.get([
//         "Accounts",
//         {username: "167"}
//     ])
// });