// var session = require('express-session');
var Auth = {
    check_login: function (req, res, next) {
        if (!req.session.logged_in) {
            return res.redirect('/login');
        }

        next();
    },
    is_admin: function (req, res, next) {
        if (!req.session.is_admin) {
            req.flash('info', 'Maaf, Anda tidak dapat mengakses halaman yang Anda tuju!');
        
            return res.redirect('/')
        }

        next();
    },
    logged_in: function (req, res, next) {
        
    }
}

module.exports = Auth;