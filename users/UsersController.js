const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const users = require("./users");
const authenticate = require("../middlewares/adminAuth");

router.get("/",authenticate,(req,res) => {
    users.findAll({order:[["e_mail","asc"]]}).then(users => {
        res.render("admin/users/users",{users: users});
    });
});

router.get("/create",authenticate,(req,res) => {
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
            res.redirect("create");
        }
    });

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password,salt);
});

router.get("/login", (req, res)=>{
    res.render("admin/users/login");
});

router.post("/authenticate", (req,res)=>{
    let email = req.body.email;
    let password = req.body.password;

    users.findOne({where:{e_mail:email}}).then(user =>{
        if(user != undefined){
            if(bcrypt.compareSync(password, user.password)){
                req.session.user = email;
                return res.redirect("/admin/users/");
            }
        }
        res.redirect("login");
    });
});

router.get("/logout",(req, res)=>{
    req.session.user = undefined;
    res.redirect("/");
});

module.exports = router;