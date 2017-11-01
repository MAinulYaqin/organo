var express = require('express');
var crypto = require('crypto');
var User = require('../models/users');
var Auth_mdw = require('../middleware/auth');

var router = express.Router();
var secret = 'codepolitan'; // the key used for hide password
var session_store;

/* GET home page. */
router.get('/', Auth_mdw.check_login ,function (req, res, next) {
    session_store = req.session;
    res.render('index', {
        title: 'Codepolitan Express.js Blog Series', session_store: session_store
    });
});

/* GET login page */
router.get('/login', function (req, res, next) {
    res.render('login');
});

router.post('/login', function (req, res, next) {
    session_store = req.session;
    var password = crypto.createHmac('sha256', secret)
                    .update(req.body.password) // The password
                    .digest('hex');

    // Alert if value of username or password is null 
    if (req.query.username == "" || req.query.password == "") {
        req.flash('info', 'Tidak ada field yang kosong !');
        console.log(password);

        res.redirect('/login');
    } else {
        User.find({ username: req.param('username'), password: password }, function (err, user) {
            if (err) throw err;

            if(user.length > 0) {
                session_store.username = user[0].username;
                session_store.email = user[0].email;
                session_store.admin = user[0].admin;
                session_store.logged_in = true;

                
                res.redirect('/');
            } else {
                req.flash('info', 'Sepertinya akun anda salah');
                res.redirect('/login');
            }
        })
    }


});

/* GET Secret Page :v */
router.get('/secret', Auth_mdw.check_login, Auth_mdw.is_admin, function (req, res, next) {
    session_store = req.session;
    res.render('secret', { session_store: session_store })
})


/* GET Logout page */
router.get('/logout', function (req, res) {
    // Will destroy session if user logout
    req.session.destroy(function (err) {
        if (err) {
            throw err;
        } else {
            res.redirect('/login');
        }
    })
});

/* ........................................................................................ */

router.get('/demo1', function (req, res, next) {
    res.render('demo1', {
        message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
        user: {
            name: 'Ainul',
            email: 'ainul.y9b@gmail.com',
            website: 'http://www.belajarnge.web.id'
        }
    });
});

module.exports = router;