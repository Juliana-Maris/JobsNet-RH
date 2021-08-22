const Sequelize = require("sequelize");


const db = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite"
});


// Return a DB instance
function getDB() {
  return db;
}


module.exports = { getDB };
