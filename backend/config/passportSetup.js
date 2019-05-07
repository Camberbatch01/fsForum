const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/userModel');

passport.use(new GoogleStrategy({
    callbackURL: '/auth/googleRedirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({googleID: profile.id}).then((currentUser)=> {
        if (currentUser){
            console.log(`user is ${currentUser}`)
        } else {
            new User({
                username: profile.displayName,
                googleID: profile.id,
                facebookID: null,
                githubID: null
            }).save().then((newUser)=> {
                console.log('new user created' + newUser);
            })
        }
    });
}));