var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

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