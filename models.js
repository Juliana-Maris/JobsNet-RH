const Sequelize = require("sequelize");

const helpers = require("./helpers");

const db = helpers.getDB();
const Post = db.define("post", {
  title: { type: Sequelize.STRING },
  cargo: { type: Sequelize.STRING },
  nome: { type: Sequelize.STRING },
  cpf: { type: Sequelize.STRING },
  ident: { type: Sequelize.STRING },
  nasc: { type: Sequelize.DATE },
  civil: { type: Sequelize.STRING },
  sexo: { type: Sequelize.STRING },
  cep: { type: Sequelize.STRING },
  rua: { type: Sequelize.STRING },
  bairro: { type: Sequelize.STRING },
  cidade: { type: Sequelize.STRING },
  estado: { type: Sequelize.STRING },
  telefone: { type: Sequelize.STRING },
  celular: { type: Sequelize.STRING },
  email: { type: Sequelize.STRING },
  veiculo: { type: Sequelize.STRING },
  habilitacao: { type: Sequelize.STRING },

  //body: { type: Sequelize.TEXT },
  slug: { type: Sequelize.STRING }
});

db.sync();

module.exports = { Post };
