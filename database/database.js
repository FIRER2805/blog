// importando a classe Sequelize
const Sequelize = require("sequelize");

// informações do banco de dados
const name = "db_guiaPress";
const user = "root";
const password = "Lasanha2805g";
const server = "localhost";
const database = "mysql";
const timeZone = "-03:00";

// instanciando o objeto de conexão do banco
const connection = new Sequelize(name, user, password, {
    host: server,
    dialect: database,
    timezone: timeZone
});

module.exports = connection;