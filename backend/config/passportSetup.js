const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/userModel');

passport.serializeUser((data, done)=>{
    done(null, data.user.id);
});

passport.deserializeUser((id, done)=> {
    User.findById(id).then((user)=> {
        done(null, user.id);    
    });
});

passport.use(new GoogleStrategy({
    callbackURL: '/auth/googleRedirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({googleID: profile.id}).then((currentUser)=> {
        if (currentUser){
            const data = {user: currentUser, token: accessToken};
            done(null, data);
        } else {
            new User({
                username: profile.displayName,
                googleID: profile.id,
                facebookID: null,
                githubID: null
            }).save().then((newUser)=> {
                const data = {user: newUser, token: accessToken};
                done(null, data);
            })
        }
    });
}));