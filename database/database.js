// importando a classe Sequelize
const Sequelize = require("sequelize");

// informações do banco de dados
const name = "db_guiaPress";
const user = "root";
const password = "Lasanha2805g";
const server = "localhost";
const database = "mysql";

// instanciando o objeto de conexão do banco
const connection = new Sequelize(name, user, password, {
    host: server,
    dialect: database
});

module.exports = connection;