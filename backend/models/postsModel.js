const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postsSchema = new Schema({
        authorID: String,
        authorName: String,
        title: String,
        tags: [{
            tag: String
        }],
        date: Date,
        content: String,
        ratings: [{
            user: String,
            rating: Number
        }],
        comments: [{
            author: String,
            date: Date,
            content: String,
            rating: Number,
        }]
});

const Posts = mongoose.model('posts', postsSchema);

module.exports = Posts;