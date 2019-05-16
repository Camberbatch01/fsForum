const router = require('express').Router();
const passport = require('passport');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('http://localhost:3000');
});

router.post('/local', passport.authenticate('local'), (req, res) => {
    if (req.user){
        res.redirect('http://localhost:3000/user/dashboard');
    } else {
        res.redirect('http://localhost:3000/');
    }
});

router.post('/create', (req, res) => {
    const {displayName, username, password} = req.body;

    if (!displayName || !username || !password) {
        res.send("Please fill in all fields");
    } else {
        User.findOne({username: username})
        .then(user => {
            if (user){
                res.send("username already exists")
            } else {
                const newUser = new User({
                    name: displayName,
                    username: username,
                    password: password,
                    googleID: null,
                    githubID: null
                });
                
                bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(() => res.send('Account created'))
                    .catch(err => res.send('Error occured' + err));
                }))
            }
        })
    }
    
})

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/googleRedirect', passport.authenticate('google') ,(req, res) => {
    res.redirect('http://localhost:3000/user/dashboard');
});

router.get('/github', passport.authenticate('github', {
    scope: ['profile']
}));

router.get('/githubRedirect', passport.authenticate('github') ,(req, res) => {
    res.redirect('http://localhost:3000/user/dashboard');
});


module.exports = router;