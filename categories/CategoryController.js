const express = require("express");
const router = express.Router();
const category = require("./category");
const slugify = require("slugify");

router.get("/admin/categories/new",(req, res)=>{
    res.render("admin/categories/new");
});

router.post("/categories/save", (req, res) =>{
    let title = req.body.title;
    if(title != ""){
        category.create({
            title: title,
            slug: slugify(title)
        }).then(()=>{
            res.redirect("/admin/categories/all");
        });
    }
    else{
        res.redirect("/admin/categories/new");
    }
});

router.get("/admin/categories/all", (req, res) => {
    category.findAll().then(categories=>{
        res.render("admin/categories/all", {categories: categories});
    });
});

router.post("/admin/categories/delete", (req, res) => {
    let id = req.body.id;
    category.destroy({
        where: {
            id: id
        }
    }).then(()=>{
        res.redirect("/admin/categories/all");
    });
});

router.post("/admin/categories/edit", (req, res) => {
    let id = req.body.id;
    category.findByPk(id).then(category => {
        res.render("admin/categories/edit", {category: category});
    });
});

router.post("/admin/categories/update", (req, res)=>{
    let id = req.body.id;
    let title = req.body.title
    category.update({
        title: title,
        slug: slugify(title)
    },
    {
        where:{
            id: id
        }}).then(()=>{
            res.redirect("/admin/categories/all");
        });
});

module.exports = router;