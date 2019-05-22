const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");
const authR = require("./routes/authRoutes");
const userRoutes = require('./routes/userRoutes');
const passportSetup = require('./config/passportSetup');
const passport = require('passport');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const session = require('express-session');

const app = express();

//connect to mongo
mongoose.connect(keys.mongodb.dbURI, ()=>{
    console.log('connected to mongodb');
});

app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: keys.session.cookieKey,
    cookie: {maxAge: 1000*60*60*24}, 
    resave: false, 
    saveUninitialized: false
}));

//initialise passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authR);
app.use('/user', userRoutes);

app.get('/', (req, res, next) => {
    res.send("Connected and working");
});

app.listen(process.env.PORT || 3001, () => {
    console.log('App listening on port 3001!');
});