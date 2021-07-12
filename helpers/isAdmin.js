module.exports = {
    isAdmin: function(req,res,next){
        if(req.isAuthenticated() && req.user.admin == 1){
            return next();
        }

        req.flash('errorMSG','logue como administrador para acessar essa página')
        res.redirect('/')
    }
}