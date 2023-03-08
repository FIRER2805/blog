const express = require("express");
const app = express();
const port = 8080;
const bodyParser = require("body-parser");
const connection = require("./database/database");
const categoryController = require("./categories/CategoryController");
const category = require("./categories/category");
const article = require("./articles/article");

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

app.get("/", (req, res)=>{
    res.render("index");
});

app.listen(8080, ()=>{
    console.log("servidor rodando na url: localhost:" + port);
});