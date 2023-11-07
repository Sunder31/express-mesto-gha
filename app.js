require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');

mongoose.connect('mongodb://0.0.0.0:27017/mestodb', {
  useNewUrlParser: true,
});

const app = express();
const PORT = 3000;

app.use(helmet());

app.use(bodyParser.json());

app.use(cookieParser());

app.use(requestLogger);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

// app.use((req, res, next) => {
//   req.user = {
//     _id: '6533fd13c53ebce554eb443d',
//   };

//   next();
// });

app.use(router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
