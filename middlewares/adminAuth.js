function adminAuthenticate(req, res, next){
    if(req.session.user == undefined){
        return res.redirect("/admin/users/login");
    }
    next();
}

module.exports = adminAuthenticate;