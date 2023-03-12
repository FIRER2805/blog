const express = require("express");
const router = express.Router();
const category = require("../categories/category");
const article = require("./article");
const slugify = require("slugify");

router.get("/admin/articles/new", (req, res)=>{
    category.findAll().then(categories => {
        res.render("admin/articles/new", {categories: categories});
    });
});

router.get("/admin/articles/all", (req, res)=>{
    article.findAll({
        include: [{model: category}]
    }).then((articles)=>{
        res.render("admin/articles/all", {articles: articles});
    });
});

router.get("/", (req, res)=>{
    article.findAll({
        order: [
            ["id", "desc"]
        ]
    }).then(articles=>{
        res.render("index", {articles: articles});
    });
});

router.get("/:slug", (req, res)=>{
    let slug = req.params.slug;
    article.findOne({
        where: {
            slug: slug
        }
    }).then(article=>{
        if(article != undefined)
        {
            res.render("public/articles/home", {article: article});
        }
        else
        {
            res.redirect("/");
        }
    }).catch(error=>{
        res.send("Erro!");
    });
});

router.post("/admin/articles/delete", (req, res) =>{
    let id = req.body.id;
    article.destroy({
        where: {
            id: id
        }
    }).then(()=>{
        res.redirect("/admin/articles/all");
    });
});

router.post("/articles/save", (req,res) => {
    let title = req.body.title;
    let slug = slugify(title);
    let body = req.body.body;
    let categoryId = req.body.category;
    
    article.create({
        title: title,
        slug: slug,
        body: body,
        categoryId: categoryId
    }).then(()=>{res.redirect("/")});
});

module.exports = router;