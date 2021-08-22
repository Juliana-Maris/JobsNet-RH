const Sequelize = require("sequelize");

const helpers = require("./helpers");


const db = helpers.getDB();
const Post = db.define("post", {
  title: { type: Sequelize.STRING },
  body: { type: Sequelize.TEXT },
  slug: { type: Sequelize.STRING }
});

db.sync();


module.exports = { Post };
