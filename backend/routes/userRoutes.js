const router = require('express').Router();
const User = require('../models/userModel');
const Data = require('../models/dataModel');
const PostDb = require('../models/postsModel');

const authCheck = (req, res, next) => {
    console.log('auth ' + req.isAuthenticated());
    if (req.isAuthenticated()){
        return next()
    } else {
        res.status(401).send('Unauthorized')
    }
}

router.get('/checkAuth', authCheck, (req, res) => {
    res.status(200).send('Access Granted');
})

router.get('/dashboard', authCheck, (req, res) => {
    PostDb.find({}).then(response => {
        res.send(response);
    })
});

router.post('/dashboard/post', authCheck, (req, res) => {
    User.findById(req.user).then(user => {
        new PostDb({
            authorID: req.user,
            authorName: user.name,
            title: req.body.title,
            tags: [{
                tag: req.body.tags
            }],
            date: new Date(),
            content: req.body.body,
            rating: 0,
            comments: null
        }).save().then(response => res.redirect('http://localhost:3000/user/dashboard'))
    })
})

router.get('/profile', authCheck, (req, res) => {
    const info = {};
    User.findById(req.user).then(user => info["personal"] = user)
    .then(() => {
        PostDb.find({authorID: req.user}).then(user => info["posts"] = user)
        .then(() => res.send(info));   
    })
});

module.exports = router;