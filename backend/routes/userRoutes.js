const router = require('express').Router();
const User = require('../models/userModel');
const Data = require('../models/dataModel');

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
    Data.findOne({userID: req.user})
    .then(user => {
        res.send(user);
    })
});

router.get('/profile', authCheck, (req, res) => {
    const info = {};
    User.findById(req.user).then(user => info["personal"] = user.name)
    .then(() => {
        Data.findOne({userID: req.user}).then(user => info["detail"] = user)
        .then(() => res.send(info));   
    })
});

module.exports = router;