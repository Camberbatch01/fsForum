const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const GithubStrategy = require('passport-github');
const LocalStrategy = require('passport-local');
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

passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));

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
                name: profile.displayName,
                username: null,
                password: null,
                googleID: profile.id,
                githubID: null
            }).save().then((newUser)=> {
                const data = {user: newUser, token: accessToken};
                done(null, data);
            })
        }
    });
}));

passport.use(new GithubStrategy({
    callbackURL: '/auth/githubRedirect',
    clientID: keys.github.clientID,
    clientSecret: keys.github.clientSecret,
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({githubID: profile.id}).then((currentUser)=> {
        if (currentUser){
            const data = {user: currentUser, token: accessToken};
            done(null, data);
        } else {
            new User({
                name: profile.displayName,
                username: null,
                password: null,
                googleID: null,
                githubID: profile.id
            }).save().then((newUser)=> {
                const data = {user: newUser, token: accessToken};
                done(null, data);
            })
        }
    });
}));