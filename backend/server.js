const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");
const authR = require("./routes/authRoutes")
const passportSetup = require('./config/passportSetup');
const keys = require('./config/keys');

const app = express();

//connect to mongo
mongoose.connect(keys.mongodb.dbURI, ()=>{
    console.log('conected to mongodb');
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/auth', authR);

app.get('/', (req, res, next) => {
    res.send("Connected and working");
});

app.listen(process.env.PORT || 3001, () => {
    console.log('App listening on port 3001!');
});