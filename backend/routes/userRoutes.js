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
            content: req.body.content,
            ratings: [],
            comments: []
        }).save().then(() => res.redirect('http://localhost:3000/user/dashboard'))
    })
})

router.post('/postRating', authCheck, (req, res) => {
    const newRating = {user: req.user, rating: req.body.value}
    PostDb.find({$and: [
        {"_id": req.body.post},
        {"ratings.user": req.user}
    ]}).then(result => {
        if (result.length === 0){
            PostDb.findByIdAndUpdate(req.body.post, {$push: {ratings: newRating}})
            .then(() => res.send('done'));
        } else {
            PostDb.findByIdAndUpdate(req.body.post,
                {$set: {"ratings.$[elem].rating": req.body.value}},
                {arrayFilters: [{"elem.user": req.user}]}
            ).then(() => res.send('done'));
        }
    });
});
    
router.get('/posts/:postID', authCheck, (req, res) => {
    PostDb.findById(req.params.postID).then(post => res.send(post))
})

router.post('/posts/:postID/comment', authCheck, (req, res) => {
    const newComment = {
        author: req.user,
        date: new Date(),
        content: req.body.comment,
        rating: 0
    }
    PostDb.findByIdAndUpdate(req.params.postID, {$push: {comments: newComment}})
    .then(() => res.redirect(`http://localhost:3000/user/posts/${req.params.postID}`))
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