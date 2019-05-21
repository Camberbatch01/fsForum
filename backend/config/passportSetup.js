const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const GithubStrategy = require('passport-github');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const keys = require('./keys');
const User = require('../models/userModel');
const Data = require('../models/dataModel');

passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err)  return done(err); 
        if (!user)  return done(null, false, {message: 'Username does not exist'}); 
        bcrypt.compare(password, user.password, function(err, isMatch){
            if (err) throw err;
            if (isMatch){
                console.log('user found')
                return done(null, user);
            } else {
                return done(null, false, {message: 'Incorrect username or password'});
            }
        });
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
            done(null, currentUser);
        } else {
            new User({
                name: profile.displayName,
                displayImage: profile._json.picture,
                username: null,
                password: null,
                googleID: profile.id,
                githubID: null
            }).save().then((newUser)=> {
                new Data({
                    userID: newUser.id,
                    tags: null,
                    posts: null,
                    following: null
                }).save().then(() => {
                    done(null, newUser);    
                })
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
            done(null, currentUser);
        } else {
            new User({
                name: profile.displayName,
                displayImage: profile._json.avatar_url,
                username: null,
                password: null,
                googleID: null,
                githubID: profile.id
            }).save().then((newUser)=> {
                new Data({
                    userID: newUser.id,
                    tags: null,
                    posts: null,
                    following: null
                }).save().then(() => {
                    done(null, newUser);    
                })
            })
        }
    });
}));

passport.serializeUser((user, done)=>{
    return done(null, user.id);
});

passport.deserializeUser((id, done)=> {
    User.findById(id).then((user)=> {
        return done(null, user.id);    
    });
});