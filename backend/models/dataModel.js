const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    userID: String,
    tags: [{
        tag: String
    }],
    posts: [{ 
        post: {
            postID: String,
            author: String,
            title: String,
            tags: [{
                tag: String
            }],
            date: Date,
            content: String,
            rating: Number,
            comments: [{
                author: String,
                date: Date,
                content: String,
                rating: Number,
            }]
        }
    }],
    following: {
        posts: [{
            postID: String,
        }],
        friends: [{
            friendID: String,
        }],
        conversations: [{
            people: [{
                personID: String
            }],
            messages: [{
                message: String,
                date: Date,
                personID: String
            }]
        }]
    }
});

const Data = mongoose.model('data', dataSchema);

module.exports = Data;