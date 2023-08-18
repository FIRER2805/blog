const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const users = require("./users");

router.get("/",(req,res) => {
    users.findAll({order:[["id","asc"]]}).then(users => {
        res.render("admin/users/users",{users: users});
    });
});

router.get("/create",(req,res) => {
    res.render("admin/users/create");
});

router.post("/insert",(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password,salt);

    users.create({
        e_mail: email,
        password: hash
    }).then(()=>{
        res.redirect("/");
    }).catch(error => {
        res.send(`<h1>Erro ao cadastrar usuário no banco</h1>
        <p>${error}</p>`);
    });
});

module.exports = router;