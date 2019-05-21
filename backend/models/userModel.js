const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    displayImage: String,
    username: String,
    password: String,
    googleID: String,
    githubID: String
});

const User = mongoose.model('user', userSchema);

module.exports = User;