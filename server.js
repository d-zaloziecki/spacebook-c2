const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const SERVER_PORT = 8080;

mongoose.connect('mongodb://localhost/spacebookDB', function () {
  console.log("DB connection established!!!");
})

const postsApi = require('./apis/postsApi');
const commentsApi = require('./apis/commentsApi')

const app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/posts" , postsApi);
app.use("/comments" , commentsApi);

app.listen(SERVER_PORT, () => {
  console.log("Server started on port " + SERVER_PORT);
});
