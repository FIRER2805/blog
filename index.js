const express = require("express");
const app = express();
const port = 8080;
const bodyParser = require("body-parser");
const connection = require("./database/database");
const categoryController = require("./categories/CategoryController");
const articleController = require("./articles/articleController");
const usersController = require("./users/UsersController");
const category = require("./categories/category");
const article = require("./articles/article");
const users = require("./users/users");

// View engine
app.set("view engine", "ejs");

// Static
app.use(express.static("public"));

// Body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

connection.authenticate().then(()=>{
    console.log("Connexão com o banco foi feita com sucesso!");
}).catch(error=>{
    console.log(error);
});

app.use("/",categoryController);
app.use("/",articleController);
app.use("/admin/users",usersController);

app.listen(port, ()=>{
    console.log("servidor rodando na url: localhost:" + port);
});