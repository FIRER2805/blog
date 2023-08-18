const express = require("express");
const router = express.Router();

router.get("/",(req,res) => {
    res.send("<h1>Área de usuários</h1>");
});

router.get("/create",(req,res) => {
    res.render("admin/users/create");
});

router.post("/insert",(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    res.json({email, password});
});

module.exports = router;