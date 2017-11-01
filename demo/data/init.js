const mongoose = require('mongoose');
const crypto = require('crypto');

const secret = 'codepolitan'; // Kunci
const password = crypto.createHmac('sha256', secret)
                    .update('rahasia123')
                    .digest('hex');

console.log('password' + password);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/organo', { useMongoClient: true });

const User = require('../models/users');

User.find({username: 'superadmin'}, function (err, user) {
    if (user.length === 0) {
        var admin = new User({
            username: 'superadmin',
            email: 'ainul.y9b@gmail.com',
            password: password,
            firstname: 'Ainul',
            lastname: 'Bedjo',
            admin: true
        });
    
        admin.save(function (err) {
            if (err) throw err;

            console.log('Admin is created');
        });
    }
});

User.find({username: 'supermember'}, function (err, user) {
    if (user.length === 0) {
        var member = new User({
            username: 'supermember',
            email: 'ainul.y9b@gmail.com',
            password: password,
            firstname: 'Super',
            lastname: 'member',
            admin: false
        });
    
        member.save(function (err) {
            if (err) throw err;

            console.log('Member is created');
        });
    }
});