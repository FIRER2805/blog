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
        ],
        limit: 5
    }).then(articles=>{
        category.findAll().then((categories)=>{
            res.render("index", {
                articles: articles,
                categories: categories
            });
        });
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
            category.findAll().then(categories=>{
                res.render("public/articles/home",{
                    article: article,
                    categories: categories
                });
            });
        }
        else
        {
            res.redirect("/");
        }
    }).catch(error=>{
        res.send("Erro!");
    });
});

router.get("/category/:slug", (req, res)=>{
    let slug = req.params.slug;
    // procura todos os artigos de uma categoria
    category.findOne({
        where: {slug: slug},
        include: [{model: article}]
    }).then(categoryFound=>{
        // se a categoria existe, ele pega todas as categorias existentes para o cabeçalho da página
        if(categoryFound != undefined){
            category.findAll().then(categories=>{
                res.render("index",{
                    // os artigos encontrados na primeira query
                    articles: categoryFound.articles,
                    // as categorias para o cabeçalho da página
                    categories: categories
                });
            });
        }
        else{
            res.redirect("/");
        }
    }).catch(error=>{
        console.log(error);
        res.redirect("/");
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

router.post("/admin/articles/edit", (req, res)=>{
    let articleId = req.body.id;
    article.findOne({where:{id: articleId}}).then(article=>{
        category.findAll().then(categories=>{
            res.render("admin/articles/edit",{
                article: article,
                categories: categories
            });
        });
    });
});

router.post("/admin/articles/update", (req, res)=>{
    let id = req.body.id;
    let title = req.body.title;
    let slug = slugify(title);
    let body = req.body.body;
    let categoryId = req.body.categoryId;

    article.update({
        title: title,
        slug: slug,
        body: body,
        categoryId: categoryId
    },
    {where:{id: id}}).then(()=>{res.redirect("/admin/articles/all")});
});

router.get("/articles/page/:num",(req,res)=>{
    const articlesToLoad = 5;
    let page = parseInt(req.params.num);
    let offset = 0;
    if(!isNaN(page) && page > 1)
    {
        offset = (page - 1) * articlesToLoad;
    }
    
    // buscando todos os artigos e contando a quantidade deles
    article.findAndCountAll({
        limit: articlesToLoad,
        offset: offset,
        oder:[
            ["id", "DESC"]
        ]
    }).then(articles => {

        // verificando se tem próxima página
        let next = false;
        if(articles.count > offset + articlesToLoad){
            next = true;
        }

        // objeto contendo os artigos e se tem próxima página
        let result = {
            articles: articles,
            next: next
        }

        category.findAll().then(categories => {
            res.render("admin/articles/page",{
                page: page,
                result: result,
                categories: categories
            });
        });
    });
});

module.exports = router;