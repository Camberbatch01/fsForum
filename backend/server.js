const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");
const login = require("./routes/login")

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', login)

app.listen(process.env.PORT || 3001, () => {
    console.log('App listening on port 3001!');
});