const express = require("express");
const router = express.Router();
const category = require("../categories/category");

router.get("/admin/articles/new", (req, res)=>{
    category.findAll().then(categories => {
        res.render("admin/articles/new", {categories: categories});
    });
});

module.exports = router;