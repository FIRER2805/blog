const Sequelize = require("sequelize");
const connection = require("../database/database");

const users = connection.define("users",{
    e_mail:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

users.sync({force: false});

module.exports = users;