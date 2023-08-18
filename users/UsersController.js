const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const users = require("./users");

router.get("/",(req,res) => {
    users.findAll({order:[["e_mail","asc"]]}).then(users => {
        res.render("admin/users/users",{users: users});
    });
});

router.get("/create",(req,res) => {
    res.render("admin/users/create");
});

router.post("/insert",(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;

    users.findOne({where: {
        e_mail: email
    }}).then(user => {
        if(user == undefined){
            users.create({
                e_mail: email,
                password: hash
            }).then(()=>{
                res.redirect("/");
            }).catch(error => {
                res.send(`<h1>Erro ao cadastrar usuário no banco</h1>
                <p>${error}</p>`);
            });
        }
        else{
            res.redirect("/admin/users/create");
        }
    })

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password,salt);
});

module.exports = router;