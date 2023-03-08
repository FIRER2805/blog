const Sequelize = require("sequelize");
const connection = require("../database/database");
const category = require("../categories/Category");

const article = connection.define("articles",{
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

category.hasMany(article); // UMA categoria tem muitos artigos
article.belongsTo(category); // Um artigo pertence a uma categoria

article.sync({force: false});

module.exports = article;