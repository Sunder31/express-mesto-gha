/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const router = require('./routes');
const { login, createUser } = require('./controllers/users');

mongoose.connect('mongodb://0.0.0.0:27017/mestodb', {
  useNewUrlParser: true,
});

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(helmet());
app.use(bodyParser.json());

app.post('/signin', login);
app.post('/signup', createUser);

// app.use((req, res, next) => {
//   req.user = {
//     _id: '6533fd13c53ebce554eb443d',
//   };

//   next();
// });

app.use(router);

app.listen(PORT);
