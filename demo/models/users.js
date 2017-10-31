const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema ({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    firstname: String,
    lastname: String,
    admin: Boolean
},{
    timestamps: true
});

var user = mongoose.model('user', userSchema);

module.exports = user;